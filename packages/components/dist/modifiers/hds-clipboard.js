import { modifier } from 'ember-modifier';
import { assert, warn } from '@ember/debug';

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const getTextToCopy = text => {
  let textToCopy;
  if (text) {
    if (typeof text === 'string') {
      textToCopy = text;
    } else if (
    // context: https://github.com/hashicorp/design-system/pull/1564
    typeof text === 'number' || typeof text === 'bigint') {
      textToCopy = text.toString();
    } else {
      assert(`\`hds-clipboard\` modifier - \`text\` argument must be a string - provided: ${typeof text}`);
    }
  }
  return textToCopy;
};
const getTargetElement = target => {
  let targetElement;
  if (typeof target === 'string') {
    targetElement = document.querySelector(target);
    if (!targetElement) {
      console.error('`hds-clipboard` modifier - `target` selector provided does not point to an existing DOM node, check your selector string', targetElement);
      return;
    }
  } else if (target instanceof Node && target.nodeType === Node.ELEMENT_NODE) {
    targetElement = target;
  } else {
    if (target instanceof NodeList) {
      assert('`hds-clipboard` modifier - `target` argument must be a string or a DOM node - provided: a list of DOM nodes');
    } else {
      assert(`\`hds-clipboard\` modifier - \`target\` argument must be a string or a DOM node - provided: ${typeof target}`);
    }
  }
  return targetElement;
};
const getTextToCopyFromTargetElement = targetElement => {
  let textToCopy;
  if (targetElement instanceof Node && targetElement.nodeType === Node.ELEMENT_NODE) {
    if (targetElement instanceof HTMLInputElement ||
    // targetElement.nodeName === 'INPUT' ||
    targetElement instanceof HTMLTextAreaElement ||
    // targetElement.nodeName === 'TEXTAREA' ||
    targetElement instanceof HTMLSelectElement // targetElement.nodeName === 'SELECT'
    ) {
      textToCopy = targetElement.value;
    } else {
      // simplest approach
      textToCopy = targetElement.innerText;

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
const writeTextToClipboard = async textToCopy => {
  // finally copy the text to the clipboard using the Clipboard API
  // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
  if (textToCopy) {
    try {
      // notice: the "clipboard-write" permission is granted automatically to pages when they are in the active tab
      // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write
      await navigator.clipboard.writeText(textToCopy);
      // DEBUG uncomment this for easy debugging
      // console.log('success', textToCopy);
      return true;
    } catch (error) {
      // clipboard write failed
      // this probably never happens (see comment above) or happens only for very old browsers that don't for which `navigator.clipboard` is undefined
      warn('copy action failed, please check your browser‘s permissions', {
        id: 'hds-clipboard.write-text-to-clipboard.catch-error'
      });
      return false;
    }
  } else {
    return false;
  }
};
const copyToClipboard = async (text, target) => {
  let textToCopy;
  if (text) {
    textToCopy = getTextToCopy(text);
  } else if (target) {
    const targetElement = getTargetElement(target);
    textToCopy = getTextToCopyFromTargetElement(targetElement);
  } else {
    assert('`hds-clipboard` modifier - either a `text` or a `target` argument is required');
  }
  const success = await writeTextToClipboard(textToCopy);
  return success;
};

// Notice: we use a function-based modifier here instead of a class-based one
// because it's quite simple in its logic, and doesn't require injecting services
// see: https://github.com/ember-modifier/ember-modifier#function-based-modifiers

var hdsClipboard = modifier((element, positional, named) => {
  assert('`hds-clipboard` modifier - the modifier must be applied to an element', element);
  const {
    text,
    target,
    onSuccess,
    onError
  } = named;
  const onClick = async event => {
    const trigger = event.currentTarget;
    const success = await copyToClipboard(text, target);

    // fire the `onSuccess/onError` callbacks (if provided)
    if (success) {
      if (typeof onSuccess === 'function') {
        onSuccess({
          trigger,
          text,
          target
        });
      }
    } else {
      if (typeof onError === 'function') {
        onError({
          trigger,
          text,
          target
        });
      }
    }
  };

  // add the "onClick" event listener to the element
  element.addEventListener('click', onClick);

  // this (teardown) function is run when the element is removed
  return () => {
    element.removeEventListener('click', onClick);
  };
});

export { copyToClipboard, hdsClipboard as default, getTargetElement, getTextToCopy, getTextToCopyFromTargetElement, writeTextToClipboard };
//# sourceMappingURL=hds-clipboard.js.map
