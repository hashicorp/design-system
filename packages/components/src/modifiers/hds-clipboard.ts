/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { modifier } from 'ember-modifier';
import { assert, warn } from '@ember/debug';

type TextToCopy = string | number | bigint;
type TargetToCopy = HTMLElement | string;

export interface HdsClipboardModifierSignature {
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
      `\`hds-clipboard\` modifier - \`text\` argument must be a string or number - provided: ${typeof text}`
    );
  }

  return textToCopy;
};

export const getTargetElement = (
  target: string | Node
): HTMLElement | undefined => {
  let targetElement: HTMLElement | null;

  if (typeof target === 'string') {
    targetElement = document.querySelector(target);

    if (!targetElement) {
      console.error(
        '`hds-clipboard` modifier - `target` selector provided does not point to an existing DOM node, check your selector string',
        targetElement
      );
      return;
    }
  } else if (target instanceof HTMLElement) {
    targetElement = target;
  } else {
    if (target instanceof NodeList) {
      assert(
        '`hds-clipboard` modifier - `target` argument must be a string or a DOM node - provided: a list of DOM nodes'
      );
    } else {
      assert(
        `\`hds-clipboard\` modifier - \`target\` argument must be a string or a DOM node - provided: ${typeof target}`
      );
    }
  }
  return targetElement;
};

export const getTextToCopyFromTargetElement = (
  targetElement: TargetToCopy
): string => {
  let textToCopy: string = '';

  if (targetElement instanceof HTMLElement) {
    if (
      targetElement instanceof HTMLInputElement || // targetElement.nodeName === 'INPUT' ||
      targetElement instanceof HTMLTextAreaElement || // targetElement.nodeName === 'TEXTAREA' ||
      targetElement instanceof HTMLSelectElement // targetElement.nodeName === 'SELECT'
    ) {
      textToCopy = targetElement.value;
    } else {
      // Hide any screen reader only text from the innerText calculation
      const srOnlyTexts = targetElement.querySelectorAll('.sr-only');
      srOnlyTexts.forEach((el: Element) => {
        el.setAttribute('style', 'display: none;');
      });

      // simplest approach
      textToCopy = targetElement.innerText;

      // Restore visibility of screen reader only text
      srOnlyTexts.forEach((el: Element) => {
        el.removeAttribute('style');
      });

      // approach based on text selection (left for backup just in case)
      // var selection = window.getSelection();
      // var range = document.createRange();
      // selection.removeAllRanges();
      // range.selectNodeContents(targetElement);
      // selection.addRange(range);
      // textToCopy = selection.toString();
      // selection.removeAllRanges();
    }
  }
  return textToCopy;
};

export const writeTextToClipboard = async (
  textToCopy: string
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
    // if it is not a secure context, use the polyfill
    // to test that this works in a non-secure context, access the port through your IP address (ie. XXX.XXX.X.XXX:4200/)
    if (!navigator.clipboard) {
      try {
        const clipboard = await import('clipboard-polyfill');
        await clipboard.writeText(textToCopy);
        return true;
      } catch (error) {
        warn(
          `copy action failed, unable to use clipboard-polyfill: ${JSON.stringify(
            error
          )}`,
          {
            id: 'hds-clipboard.write-text-to-clipboard.catch-error',
          }
        );
        return false;
      }
    }

    return false;
  }
};

export const copyToClipboard = async (
  text?: TextToCopy,
  target?: TargetToCopy
): Promise<boolean> => {
  let textToCopy: string = '';

  if (text !== undefined) {
    textToCopy = getTextToCopy(text);
  } else if (target) {
    const targetElement = getTargetElement(target);
    if (targetElement) {
      textToCopy = getTextToCopyFromTargetElement(targetElement);
    }
  } else {
    assert(
      '`hds-clipboard` modifier - either a `text` or a `target` argument is required'
    );
  }
  const success = await writeTextToClipboard(textToCopy);
  return success;
};

// Notice: we use a function-based modifier here instead of a class-based one
// because it's quite simple in its logic, and doesn't require injecting services
// see: https://github.com/ember-modifier/ember-modifier#function-based-modifiers

export default modifier<HdsClipboardModifierSignature>(
  (element, _positional, named): (() => void) => {
    assert(
      '`hds-clipboard` modifier - the modifier must be applied to an element',
      element
    );

    const { text, target, onSuccess, onError } = named;

    const onClick = async (event: MouseEvent): Promise<void> => {
      const trigger = event.currentTarget;
      const success = await copyToClipboard(text, target);

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
  }
);
