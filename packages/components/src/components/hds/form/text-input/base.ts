/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { HdsFormTextInputTypeValues } from './types.ts';
import type { HdsFormTextInputTypes } from './types.ts';

// notice: we don't support all the possible HTML types, only a subset
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
export const DEFAULT_TYPE = HdsFormTextInputTypeValues.Text;
export const TYPES: HdsFormTextInputTypes[] = Object.values(
  HdsFormTextInputTypeValues
);

export interface HdsFormTextInputBaseSignature {
  Args: {
    hasVisibilityToggle?: boolean;
    isInvalid?: boolean;
    isLoading?: boolean;
    type?: HdsFormTextInputTypes;
    value?: string;
    width?: string;
    id?: string;
    ariaDescribedBy?: string;
  };
  Element: HTMLInputElement;
}

export default class HdsFormTextInputBase extends Component<HdsFormTextInputBaseSignature> {
  /**
   * Sets the type of input
   *
   * @param type
   * @type {string}
   * @default 'text'
   */
  get type(): HdsFormTextInputTypes {
    const { type = DEFAULT_TYPE } = this.args;

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
  get classNames(): string {
    const classes = ['hds-form-text-input'];

    // add typographic classes
    classes.push('hds-typography-body-200', 'hds-font-weight-regular');

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-text-input--is-invalid`);
    }

    // add a class based on the @hasVisibilityToggle argument
    if (this.args.hasVisibilityToggle) {
      classes.push(`hds-form-text-input--has-visibility-toggle`);
    }

    // add a class based on the @isLoading argument
    if (this.args.isLoading) {
      classes.push(`hds-form-text-input--is-loading`);
    }

    return classes.join(' ');
  }
}
