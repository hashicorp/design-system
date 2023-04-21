/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

// notice: we don't support all the possible HTML types, only a subset
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
export const DEFAULT_TYPE = 'text';
export const TYPES = [
  'text',
  'email',
  'password',
  'url',
  'search',
  'date',
  'time',
];

export default class HdsFormTextInputBaseComponent extends Component {
  /**
   * Sets the type of input
   *
   * @param type
   * @type {string}
   * @default 'text'
   */
  get type() {
    let { type = DEFAULT_TYPE } = this.args;

    assert(
      `@type for "Hds::Form::TextInput" must be one of the following: ${TYPES.join(
        ', '
      )}; received: ${type}`,
      TYPES.includes(type)
    );

    return type;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-text-input'];

    // add typographic classes
    classes.push('hds-typography-body-200', 'hds-font-weight-regular');

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-text-input--is-invalid`);
    }

    // add a class based on the @contextualClass argument
    // notice: this will *not* be documented for public use
    // the reason for this is that the contextual component declarations don't pass attributes to the component
    if (this.args.contextualClass) {
      classes.push(this.args.contextualClass);
    }

    return classes.join(' ');
  }
}
