/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Modifier from 'ember-modifier';

const copyToClipboard = (text, target) => {
  let textToCopy;

  if (text && typeof text === 'string') {
    textToCopy = text;
  } else if (target) {
    // todo! check that the node exists
    const targetElement = document.querySelector(target);
    if (
      // TODO! improve handling of target elements here!
      // target instanceof HTMLInputElement && !['text', 'search', 'url', 'tel', 'password'].includes(target?.type)
      targetElement.nodeName === 'INPUT' ||
      targetElement.nodeName === 'SELECT' ||
      targetElement.nodeName === 'TEXTAREA'
    ) {
      textToCopy = targetElement.value;
    } else {
      // TODO! add handling of `innerText` for other elements
      if (targetElement.hasAttribute('contenteditable')) {
        targetElement.focus();
      }

      var selection = window.getSelection();
      var range = document.createRange();

      selection.removeAllRanges();
      range.selectNodeContents(targetElement);
      selection.addRange(range);

      textToCopy = selection.toString();

      selection.removeAllRanges();
    }
  } else {
    // TODO! console an error message here
  }

  // finally copy the text

  if (textToCopy) {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        /* clipboard successfully set */
        console.log('success', textToCopy);
      },
      (error) => {
        /* clipboard write failed */
        console.log('error', textToCopy, error);
      }
    );
    // TODO! add handling of success/error
    return true;
  } else {
    return false;
  }
};

export default class HdsClipboardModifier extends Modifier {
  // constructor(trigger, text, target, onSuccess, onError) {
  //   super();
  //   this.text = text;
  //   this.target = target;
  //   this.onSuccess = onSuccess;
  //   this.onError = onError;
  //   this.listenClick(trigger);
  // }
  didSetup = false;
  listener = null;

  modify(element, positional, named) {
    const { text, target, onSuccess, onError } = named;
    this.text = text;
    this.target = target;
    this.onSuccess = onSuccess;
    this.onError = onError;
    this.#listenClick(element);
  }

  /**
   * Adds a click event listener to the passed trigger.
   * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
   */
  #listenClick(trigger) {
    this.listener = trigger.addEventListener('click', (e) => this.#onClick(e));
  }

  /**
   * Defines a new `ClipboardAction` on each click event.
   * @param {Event} e
   */
  #onClick(e) {
    const trigger = e.delegateTarget || e.currentTarget;
    const success = copyToClipboard(this.text, this.target);

    // Fires an event based on the copy operation result.
    const args = {
      triggger: trigger,
      text: this.text,
      target: this.target,
    };
    if (success) {
      this.onSuccess(args);
    } else {
      this.onError(args);
    }
  }

  willDestroy() {
    this.listener.destroy();
  }
}
