import { modifier } from 'ember-modifier';

const observers = new WeakMap();

export function resizeObserver(
  element: HTMLElement,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [handler]: [any]
): () => void {
  let observer;

  if (observers.has(handler)) {
    observer = observers.get(handler);
  } else {
    observer = new ResizeObserver(handler);

    observers.set(handler, observer);
  }

  observer.observe(element);

  return function () {
    observer.unobserve(element);
  };
}

export default modifier(resizeObserver);
