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
