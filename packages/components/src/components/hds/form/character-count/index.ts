/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { HdsTextBodySignature } from '../../text/body';

const ID_PREFIX = 'character-count-';
const NOOP = (): void => {};

interface HdsFormCharacterCountSignature {
  Args: {
    contextualClass?: string;
    controlId?: string;
    maxLength?: number | string;
    minLength?: number | string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onInsert?: (element: HTMLElement, ...args: any[]) => void;
    value?: string;
  };
  Blocks: {
    default?: [
      {
        minLength?: number;
        maxLength?: number;
        currentLength?: number;
        remaining?: number;
        shortfall?: number;
      }
    ];
  };
  Element: HdsTextBodySignature['Element'];
}

export default class HdsFormCharacterCountComponent extends Component<HdsFormCharacterCountSignature> {
  // The current number of characters in @value
  get currentLength(): number {
    const { value } = this.args;
    return value ? value.length : 0;
  }

  // Inflector utility function to determine plural or singular for 'character' noun
  private _pluralize(
    count?: number,
    prefix = '',
    noun = 'character',
    suffix = 's'
  ): string {
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
  get maxLength(): number | undefined {
    const { maxLength } = this.args;
    if (maxLength) {
      return typeof maxLength === 'number' ? maxLength : parseInt(maxLength);
    }
  }

  /**
   * @param minLength
   * @type {number}
   * @default null
   * @description The minimum number of characters allowed.
   */
  get minLength(): number | undefined {
    const { minLength } = this.args;
    if (minLength) {
      return typeof minLength === 'number' ? minLength : parseInt(minLength);
    }
  }

  /**
   * @param remaining
   * @type {number}
   * @default null
   * @description The remaining number of characters.
   */
  get remaining(): number | undefined {
    return this.maxLength ? this.maxLength - this.currentLength : undefined;
  }

  /**
   * @param shortfall
   * @type {number}
   * @default null
   * @description The number of characters the content is falling short of.
   */
  get shortfall(): number | undefined {
    return this.minLength ? this.minLength - this.currentLength : undefined;
  }

  /**
   * @param message
   * @type {string}
   * @default null
   * @description The character count message presented to users
   */
  get message(): string {
    let messageText = '';
    if (this.minLength && this.currentLength === 0) {
      messageText = `${this._pluralize(this.minLength)} required`;
    } else if (this.minLength && this.currentLength < this.minLength) {
      messageText = `${this._pluralize(this.shortfall, 'more')} required`;
    } else if (this.maxLength && this.currentLength === 0) {
      messageText = `${this._pluralize(this.maxLength)} allowed`;
    } else if (this.maxLength && this.currentLength <= this.maxLength) {
      messageText = `${this._pluralize(this.remaining)} remaining`;
    } else if (
      this.maxLength &&
      this.remaining &&
      this.currentLength > this.maxLength
    ) {
      messageText = `Exceeded by ${this._pluralize(-this.remaining)}`;
    } else {
      messageText = `${this._pluralize(this.currentLength)} entered`;
    }
    return messageText;
  }

  /**
   * Determines the unique ID to assign to the element
   * @method id
   * @return {(string|null)} The "id" attribute to apply to the element or null, if no controlId is provided
   */
  get id(): string | null {
    const { controlId } = this.args;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onInsert(): (element: HTMLElement, ...args: any[]) => void {
    const { onInsert } = this.args;
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
  get classNames(): string {
    const classes = ['hds-form-character-count'];

    // add a class based on the @contextualClass argument
    // notice: this will *not* be documented for public use
    // the reason for this is that the contextual component declarations don't pass attributes to the component
    if (this.args.contextualClass) {
      classes.push(this.args.contextualClass);
    }

    return classes.join(' ');
  }
}
