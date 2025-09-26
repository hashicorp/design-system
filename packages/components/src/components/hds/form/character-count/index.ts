/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { HdsTextBodySignature } from '../../text/body';

const ID_PREFIX = 'character-count-';

export interface HdsFormCharacterCountSignature {
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
      },
    ];
  };
  Element: HdsTextBodySignature['Element'];
}

export default class HdsFormCharacterCount extends Component<HdsFormCharacterCountSignature> {
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

  get maxLength(): number | undefined {
    const { maxLength } = this.args;
    if (maxLength) {
      return typeof maxLength === 'number' ? maxLength : parseInt(maxLength);
    }
  }

  get minLength(): number | undefined {
    const { minLength } = this.args;
    if (minLength) {
      return typeof minLength === 'number' ? minLength : parseInt(minLength);
    }
  }

  get remaining(): number | undefined {
    return this.maxLength ? this.maxLength - this.currentLength : undefined;
  }

  get shortfall(): number | undefined {
    return this.minLength ? this.minLength - this.currentLength : undefined;
  }

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

  get id(): string | null {
    const { controlId } = this.args;
    if (controlId) {
      return `${ID_PREFIX}${controlId}`;
    }
    return null;
  }

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
