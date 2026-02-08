/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { buildWaiter } from '@ember/test-waiters';

const waiter = buildWaiter('raf-waiter');

// a utility that wraps requestAnimationFrame and integrates with Ember's test waiters
export function requestAnimationFrameWaiter(callback: () => void) {
  const token = waiter.beginAsync();

  return requestAnimationFrame(() => {
    try {
      callback();
    } finally {
      waiter.endAsync(token);
    }
  });
}

export function pixelToNumber(px: `${number}px`): number {
  return Number(px.replace('px', ''));
}

export function isPixelSize(value?: string): boolean {
  if (value === undefined) {
    return false;
  }

  return /^-?\d+(\.\d+)?px$/.test(value);
}

export function parsePixel(value?: string): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!isPixelSize(value)) {
    return undefined;
  }

  return pixelToNumber(value as `${number}px`);
}
