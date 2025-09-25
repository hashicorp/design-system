import { modifier } from 'ember-modifier';
import { assert } from '@ember/debug';

type HdsLifecycleCallback = ((element: HTMLElement) => void) | (() => void);

export interface HdsLifecycleModifierSignature {
  Element: HTMLElement;
  Args: {
    Named: {
      onInsert: HdsLifecycleCallback;
      onDestroy?: HdsLifecycleCallback;
      passElement?: boolean;
    };
  };
}

const hdsLifecycleModifier = modifier<HdsLifecycleModifierSignature>(
  (element, _positional, { onInsert, onDestroy, passElement = false }) => {
    assert(
      'The `onInsert` argument for "hds-element-lifecycle" must be a function.',
      typeof onInsert === 'function'
    );

    if (passElement) {
      (onInsert as (element: HTMLElement) => void)(element);
    } else {
      (onInsert as () => void)();
    }

    return () => {
      if (typeof onDestroy === 'function') {
        if (passElement) {
          (onDestroy as (element: HTMLElement) => void)(element);
        } else {
          (onDestroy as () => void)();
        }
      }
    };
  }
);

export default hdsLifecycleModifier;
