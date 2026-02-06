/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import HdsFormIndicator from '../indicator/index.gts';

import type { HdsFormIndicatorSignature } from '../indicator/index.gts';

export const ID_PREFIX = 'label-';

export interface HdsFormLabelSignature {
  Args: {
    contextualClass?: string;
    controlId?: string;
    isOptional?: HdsFormIndicatorSignature['Args']['isOptional'];
    isRequired?: HdsFormIndicatorSignature['Args']['isRequired'];
    hiddenText?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLLabelElement;
}

export default class HdsFormLabel extends Component<HdsFormLabelSignature> {
  get id(): string | null {
    const { controlId } = this.args;
    if (controlId) {
      return `${ID_PREFIX}${controlId}`;
    }
    return null;
  }

  get classNames(): string {
    const classes = ['hds-form-label'];

    // add typographic classes
    classes.push('hds-typography-body-200', 'hds-font-weight-semibold');

    // add a class based on the @contextualClass argument
    // notice: this will *not* be documented for public use
    // the reason for this is that the contextual component declarations don't pass attributes to the component
    if (this.args.contextualClass) {
      classes.push(this.args.contextualClass);
    }

    return classes.join(' ');
  }

  <template>
    <label
      class={{this.classNames}}
      for="{{@controlId}}"
      id={{this.id}}
      ...attributes
    >
      {{yield}}
      <HdsFormIndicator
        @isRequired={{@isRequired}}
        @isOptional={{@isOptional}}
      />
      {{#if @hiddenText}}
        <span class="sr-only">
          {{@hiddenText}}
        </span>
      {{/if}}
    </label>
  </template>
}
