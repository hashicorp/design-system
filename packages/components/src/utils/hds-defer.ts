/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { isDestroyed, isDestroying } from '@ember/destroyable';
import { renderSettled } from '@ember/renderer';
import { waitForPromise } from '@ember/test-waiters';

const pendingOnce = new WeakMap<object, Set<() => void>>();

const isTornDown = (destroyable: object): boolean =>
  isDestroying(destroyable) || isDestroyed(destroyable);

const runUnlessTornDown = (
  callback: () => void,
  destroyable?: object
): void => {
  if (destroyable !== undefined && isTornDown(destroyable)) {
    return;
  }

  callback();
};

// accepts both native and RSVP promises (`renderSettled` returns the latter)
const track = (promise: Parameters<typeof waitForPromise>[0]): void => {
  // the returned promise is intentionally not awaited, errors still surface through the test waiter and `Ember.onerror`
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  waitForPromise(promise);
};

/**
 * Runs the callback once Ember has finished rendering pending changes.
 * Replacement for `schedule('afterRender', ...)`.
 *
 * When `destroyable` is provided, the callback is skipped if it has been
 * destroyed in the meantime. Omit it when the callback must run during teardown
 * (e.g. to notify a consumer).
 */
export function deferAfterRender(
  callback: () => void,
  destroyable?: object
): void {
  track(renderSettled().then(() => runUnlessTornDown(callback, destroyable)));
}

/**
 * Same as `deferAfterRender`, but ignores further calls with the same callback
 * for the same `destroyable` until the first one has run.
 * Replacement for `scheduleOnce('afterRender', target, method)`.
 *
 * The callback must have a stable identity (e.g. a class field or `@action`),
 * an inline function never matches a pending one.
 */
export function deferAfterRenderOnce(
  callback: () => void,
  destroyable: object
): void {
  const pending = pendingOnce.get(destroyable) ?? new Set<() => void>();

  if (pending.has(callback)) {
    return;
  }

  pending.add(callback);
  pendingOnce.set(destroyable, pending);

  deferAfterRender(() => {
    pending.delete(callback);
    callback();
  }, destroyable);
}

/**
 * Runs the callback in a later macrotask, after the browser has had a chance
 * to paint. Replacement for `next(...)`.
 *
 * When `destroyable` is provided, the callback is skipped if it has been
 * destroyed in the meantime.
 */
export function deferToNextTask(
  callback: () => void,
  destroyable?: object
): void {
  track(
    new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    }).then(() => runUnlessTornDown(callback, destroyable))
  );
}
