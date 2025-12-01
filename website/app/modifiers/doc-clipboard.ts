/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { modifier } from 'ember-modifier';
import { assert } from '@ember/debug';

type TextToCopy = string | number | bigint;
type TargetToCopy = HTMLElement | string;

export interface DocClipboardModifierSignature {
  Element: HTMLElement;
  Args: {
    Named: {
      text?: TextToCopy;
      target?: TargetToCopy;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess?: (...args: any[]) => void;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError?: (...args: any[]) => void;
    };
  };
}

export const getTextToCopy = (text: TextToCopy): string => {
  let textToCopy: string = '';

  if (typeof text === 'string') {
    textToCopy = text;
  } else if (
    // context: https://github.com/hashicorp/design-system/pull/1564
    typeof text === 'number' ||
    typeof text === 'bigint'
  ) {
    textToCopy = text.toString();
  } else {
    assert(
      `\`hds-clipboard\` modifier - \`text\` argument must be a string or number - provided: ${typeof text}`,
    );
  }

  return textToCopy;
};

export const writeTextToClipboard = async (
  textToCopy: string,
): Promise<boolean> => {
  // finally copy the text to the clipboard using the Clipboard API
  // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
  try {
    // notice: the "clipboard-write" permission is granted automatically to pages when they are in the active tab
    // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write
    await navigator.clipboard.writeText(textToCopy);
    // DEBUG uncomment this for easy debugging
    // console.log('success', textToCopy);
    return true;
  } catch {
    return false;
  }
};

export const copyToClipboard = async (text?: TextToCopy): Promise<boolean> => {
  let textToCopy: string = '';

  if (text !== undefined) {
    textToCopy = getTextToCopy(text);
  } else {
    assert('`doc-clipboard` modifier - `text` argument is required');
  }
  const success = await writeTextToClipboard(textToCopy);
  return success;
};

// Notice: we use a function-based modifier here instead of a class-based one
// because it's quite simple in its logic, and doesn't require injecting services
// see: https://github.com/ember-modifier/ember-modifier#function-based-modifiers

export default modifier<DocClipboardModifierSignature>(
  (element, _positional, named): (() => void) => {
    assert(
      '`doc-clipboard` modifier - the modifier must be applied to an element',
      element,
    );

    const { text, target, onSuccess, onError } = named;

    const onClick = async (event: MouseEvent): Promise<void> => {
      const trigger = event.currentTarget;
      const success = await copyToClipboard(text);

      // fire the `onSuccess/onError` callbacks (if provided)
      if (success) {
        if (typeof onSuccess === 'function') {
          onSuccess({ trigger, text, target });
        }
      } else {
        if (typeof onError === 'function') {
          onError({ trigger, text, target });
        }
      }
    };

    // add the "onClick" event listener to the element
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    element.addEventListener('click', onClick);

    // this (teardown) function is run when the element is removed
    return (): void => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      element.removeEventListener('click', onClick);
    };
  },
);
