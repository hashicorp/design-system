/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { isDestroyed, isDestroying } from '@ember/destroyable';
import { waitForPromise } from '@ember/test-waiters';

type Context = object;

const pendingOnce = new WeakMap<Context, Set<() => void>>();

const isContextTornDown = (context: Context): boolean =>
  isDestroying(context) || isDestroyed(context);

const run = (context: Context, callback: () => void): void => {
  if (isContextTornDown(context)) {
    return;
  }

  callback();
};

/**
 * Runs the callback once the current synchronous render has completed.
 * Replacement for `schedule('afterRender', ...)`.
 * The callback is skipped if `context` has been destroyed in the meantime,
 * and the pending work is tracked so that test `settled()` waits for it.
 */
export function deferAfterRender(context: Context, callback: () => void): void {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  waitForPromise(Promise.resolve().then(() => run(context, callback)));
}

/**
 * Same as `deferAfterRender`, but ignores further calls with the same callback
 * for the same `context` until the first one has run.
 * Replacement for `scheduleOnce('afterRender', context, callback)`.
 */
export function deferAfterRenderOnce(
  context: Context,
  callback: () => void
): void {
  let pending = pendingOnce.get(context);

  if (!pending) {
    pending = new Set();
    pendingOnce.set(context, pending);
  }

  if (pending.has(callback)) {
    return;
  }

  pending.add(callback);

  deferAfterRender(context, () => {
    pending.delete(callback);
    callback();
  });
}

/**
 * Runs the callback in a later task, after the browser has had the chance to
 * process pending work. Replacement for `next(...)`.
 */
export function deferToNextTask(context: Context, callback: () => void): void {
  const promise = new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
  }).then(() => run(context, callback));

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  waitForPromise(promise);
}

/**
 * Runs the callback on the next animation frame. Use it for work triggered by
 * a `ResizeObserver` that may alter layout, to avoid the
 * "ResizeObserver loop completed with undelivered notifications" error.
 */
export function deferToAnimationFrame(
  context: Context,
  callback: () => void
): void {
  const promise = new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  }).then(() => run(context, callback));

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  waitForPromise(promise);
}
