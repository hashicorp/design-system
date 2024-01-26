/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

const ID_PREFIX = 'character-count-';
const NOOP = () => {};

export default class HdsFormCharacterCountIndexComponent extends Component {
  // The current number of characters in @value
  get currentLength() {
    let { value } = this.args;
    return value ? value.length : 0;
  }

  // Inflector utility function to determine plural or singular for 'character' noun
  pluralize(count, prefix = '', noun = 'character', suffix = 's') {
    return `${count}${prefix ? ' ' + prefix : ''} ${noun}${
      count !== 1 ? suffix : ''
    }`;
  }

  /**
   * @param maxLength
   * @type {number}
   * @default null
   * @description The maximum number of characters allowed.
   */
  get maxLength() {
    let { maxLength } = this.args;
    return parseInt(maxLength);
  }

  /**
   * @param minLength
   * @type {number}
   * @default null
   * @description The minimum number of characters allowed.
   */
  get minLength() {
    let { minLength } = this.args;
    return parseInt(minLength);
  }

  /**
   * @param remaining
   * @type {number}
   * @default null
   * @description The remaining number of characters.
   */
  get remaining() {
    return this.maxLength - this.currentLength;
  }

  /**
   * @param shortfall
   * @type {number}
   * @default null
   * @description The number of characters the content is falling short of.
   */
  get shortfall() {
    return this.minLength - this.currentLength;
  }

  /**
   * @param message
   * @type {string}
   * @default null
   * @description The character count message presented to users
   */
  get message() {
    let messageText = '';
    if (this.minLength && this.currentLength === 0) {
      messageText = `${this.pluralize(this.minLength)} required`;
    } else if (this.minLength && this.currentLength < this.minLength) {
      messageText = `${this.pluralize(this.shortfall, 'more')} required`;
    } else if (this.maxLength && this.currentLength === 0) {
      messageText = `${this.pluralize(this.maxLength)} allowed`;
    } else if (this.maxLength && this.currentLength <= this.maxLength) {
      messageText = `${this.pluralize(this.remaining)} remaining`;
    } else if (this.currentLength > this.maxLength) {
      messageText = `Exceeded by ${this.pluralize(-this.remaining)}`;
    } else {
      messageText = `${this.pluralize(this.currentLength)} entered`;
    }
    return messageText;
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
    // notice: this is a guard used to prevent triggering an error when the component is used as standalone element
    if (typeof onInsert === 'function') {
      return onInsert;
    } else {
      return NOOP;
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
