/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Modifier from 'ember-modifier';
import { assert } from '@ember/debug';

async function copyToClipboard(text, target) {
  let textToCopy;

  if (text) {
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
        `\`hds-clipboard\` modifier - \`text\` argument must be a string - provided: ${typeof text}`
      );
    }
  } else if (target) {
    let targetElement;
    if (typeof target === 'string') {
      targetElement = document.querySelector(target);

      assert(
        '`hds-clipboard` modifier - `target` selector provided does not point to an existing DOM node, check your selector string',
        targetElement
      );
    } else if (target instanceof Node && target.nodeType === 1) {
      targetElement = target;
    } else if (target instanceof NodeList) {
      assert(
        '`hds-clipboard` modifier - `target` argument must be a string or a DOM node - provided: a list of DOM nodes'
      );
    } else {
      assert(
        `\`hds-clipboard\` modifier - \`target\` argument must be a string or a DOM node - provided: ${typeof target}`
      );
    }

    if (
      targetElement instanceof HTMLInputElement || // targetElement.nodeName === 'INPUT' ||
      targetElement instanceof HTMLTextAreaElement || // targetElement.nodeName === 'TEXTAREA' ||
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
  } else {
    assert(
      '`hds-clipboard` modifier - either a `text` or a `target` argument is required'
    );
  }

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
      console.log(
        '`hds-clipboard` modifier - an error occurred while writing to the clipboard - check your browser permissions',
        textToCopy,
        error
      );
      return false;
    }
  } else {
    return false;
  }
}

export default class HdsClipboardModifier extends Modifier {
  didSetup = false;

  modify(element, positional, named) {
    assert(
      '`hds-clipboard` modifier - the modifier must be applied to an element',
      element
    );

    const { text, target, onSuccess, onError } = named;
    this.text = text;
    this.target = target;
    this.onSuccess = onSuccess;
    this.onError = onError;

    if (!this.didSetup) {
      this.#listenClick(element);
      this.didSetup = true;
    }
  }

  // add a "click" event listener to the element
  #listenClick(element) {
    this.listener = element.addEventListener('click', (e) => this.#onClick(e));
  }

  // defines a new `copyToClipboard` action on each click event
  async #onClick(e) {
    const trigger = e.delegateTarget || e.currentTarget;
    const success = await copyToClipboard(this.text, this.target);

    // fire the `onSuccess/onError` callbacks (if provided)
    const args = {
      triggger: trigger,
      text: this.text,
      target: this.target,
    };
    if (success) {
      if (typeof this.onSuccess === 'function') {
        this.onSuccess(args);
      }
    } else {
      if (typeof this.onError === 'function') {
        this.onError(args);
      }
    }
  }

  willDestroy() {
    this.listener.destroy();
  }
}
