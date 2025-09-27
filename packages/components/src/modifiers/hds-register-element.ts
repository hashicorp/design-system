import { modifier } from 'ember-modifier';
import { assert } from '@ember/debug';

type HdsRegisterElementCallback = (element: HTMLElement) => void;

export interface HdsRegisterElementModifierSignature {
  Element: HTMLElement;
  Args: {
    Positional: [
      onInsert: HdsRegisterElementCallback,
      onDestroy?: HdsRegisterElementCallback,
    ];
  };
}

const hdsRegisterElementModifier =
  modifier<HdsRegisterElementModifierSignature>(
    (element, [onInsert, onDestroy]) => {
      assert(
        'The `onInsert` argument for "hds-register-element" must be a function.',
        typeof onInsert === 'function'
      );

      onInsert(element);

      return () => {
        if (typeof onDestroy === 'function') {
          onDestroy(element);
        }
      };
    }
  );

export default hdsRegisterElementModifier;
