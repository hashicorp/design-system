import { modifier } from 'ember-modifier';

type HdsLifecycleCallback = ((element: HTMLElement) => void) | (() => void);

export interface HdsLifecycleModifierSignature {
  Element: HTMLElement;
  Args: {
    Named: {
      didInsert?: HdsLifecycleCallback;
      willDestroy?: HdsLifecycleCallback;
      passElement?: boolean;
    };
  };
}

const hdsLifecycleModifier = modifier<HdsLifecycleModifierSignature>(
  (element, _positional, { didInsert, willDestroy, passElement = true }) => {
    if (typeof didInsert === 'function') {
      if (passElement) {
        (didInsert as (element: HTMLElement) => void)(element);
      } else {
        (didInsert as () => void)();
      }
    }

    return () => {
      if (typeof willDestroy === 'function') {
        if (passElement) {
          (willDestroy as (element: HTMLElement) => void)(element);
        } else {
          (willDestroy as () => void)();
        }
      }
    };
  }
);

export default hdsLifecycleModifier;
