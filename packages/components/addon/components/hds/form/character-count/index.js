/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export const ID_PREFIX = 'character-count-';

const NOOP = () => {};

export default class HdsFormCharacterCountIndexComponent extends Component {
  @tracked message;
  @tracked currentLength; // The current number of characters typed into the associated input

  /**
   * @param maxLength
   * @type {number}
   * @default null
   * @description The maximum number of characters allowed.
   */
  get maxLength() {
    let { maxLength } = this.args;
    return maxLength;
  }

  /**
   * @param remainingLength
   * @type {number}
   * @default null
   * @description The remaining number of characters.
   */
  get remainingLength() {
    return this.maxLength - this.currentLength;
  }

  /**
   * Determines the unique ID to assign to the element
   * @method id
   * @return {(string|null)} The "id" attribute to apply to the element or null, if no controlId is provided
   */
  get id() {
    let { controlId } = this.args;
    if (controlId) {
      return `${ID_PREFIX}${controlId}`;
    }
    return null;
  }

  /**
   * @param onInsert
   * @type {function}
   * @default () => {}
   */
  get onInsert() {
    let { onInsert } = this.args;

    let inputControl = document.getElementById(this.args.controlId);
    if (inputControl && inputControl.value) {
      this.updateMessage(inputControl);
      inputControl.addEventListener('input', this.onInput);
    }

    // notice: this is a guard used to prevent triggering an error when the component is used as standalone element
    if (typeof onInsert === 'function') {
      return onInsert;
    } else {
      return NOOP;
    }
  }

  @action onInput(event) {
    let inputControl = event.target;
    this.updateMessage(inputControl);
  }

  @action updateMessage(inputControl) {
    if (inputControl) {
      this.currentLength = inputControl.value.length;
      this.message = `${this.currentLength}/${this.maxLength}`;
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-character-count'];

    // add a class based on the @contextualClass argument
    // notice: this will *not* be documented for public use
    // the reason for this is that the contextual component declarations don't pass attributes to the component
    if (this.args.contextualClass) {
      classes.push(this.args.contextualClass);
    }

    return classes.join(' ');
  }
}
