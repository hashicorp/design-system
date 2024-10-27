/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { getElementId } from '../../../utils/hds-get-element-id.ts';
import {
  ariaDescribedBy,
  registerAriaDescriptionElement,
  unregisterAriaDescriptionElement,
} from '../../../utils/hds-aria-described-by.ts';
import { HdsFormFieldLayoutValues } from './field/types.ts';
import HdsFormLabelComponent from './label.ts';
import HdsFormHelperTextComponent from './helper-text.ts';
import HdsFormCharacterCountComponent from './character-count.ts';
import HdsFormErrorComponent from './error.ts';

import type { HdsFormFieldLayouts } from './field/types.ts';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type { HdsYieldSignature } from '../yield.ts';
import type { AriaDescribedByComponent } from '../../../utils/hds-aria-described-by.ts';

export const LAYOUT_TYPES = Object.values(HdsFormFieldLayoutValues);

export interface HdsFormFieldSignature {
  Args: {
    id?: string;
    extraAriaDescribedBy?: string;
    contextualClass?: string;
    isOptional?: boolean;
    isRequired?: boolean;
    layout?: HdsFormFieldLayouts;
  };
  Blocks: {
    default: [
      {
        Label?: WithBoundArgs<
          typeof HdsFormLabelComponent,
          'contextualClass' | 'controlId' | 'isRequired' | 'isOptional'
        >;
        HelperText?: WithBoundArgs<
          typeof HdsFormHelperTextComponent,
          'contextualClass' | 'controlId' | 'onInsert'
        >;
        Control?: ComponentLike<HdsYieldSignature>;
        CharacterCount?: WithBoundArgs<
          typeof HdsFormCharacterCountComponent,
          'contextualClass' | 'controlId' | 'onInsert'
        >;
        Error?: WithBoundArgs<
          typeof HdsFormErrorComponent,
          'contextualClass' | 'controlId' | 'onInsert' | 'onRemove'
        >;
        id?: string;
        ariaDescribedBy?: string;
      },
    ];
  };
  Element: HTMLElement;
}

// @ts-expect-error: decorator function return type 'ClassOf<AriaDescribedBy>' is not assignable to 'typeof HdsFormField'
@ariaDescribedBy
export default class HdsFormField extends Component<HdsFormFieldSignature> {
  /**
   * Sets the layout of the field
   *
   * @param layout
   * @type {string}
   */
  get layout(): HdsFormFieldLayouts | undefined {
    const { layout } = this.args;

    assert(
      `@layout for "Hds::Form::Field" must be one of the following: ${LAYOUT_TYPES.join(
        ', '
      )}; received: ${layout}`,
      LAYOUT_TYPES.includes(layout as HdsFormFieldLayoutValues)
    );

    return layout;
  }

  /**
   * Calculates the unique ID to assign to the form control
   */
  get id(): string {
    return getElementId(this);
  }

  /**
   * @param isRequired
   * @type {boolean}
   * @default false
   */
  get isRequired(): boolean {
    return this.args.isRequired || false;
  }

  /**
   * @param isOptional
   * @type {boolean}
   * @default false
   */
  get isOptional(): boolean {
    return this.args.isOptional || false;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes: string[] = [];

    if (this.args.layout) {
      classes.push(`hds-form-field--layout-${this.layout}`);
    }

    // add a class based on the @contextualClass argument
    // notice: this will *not* be documented for public use
    if (this.args.contextualClass) {
      classes.push(this.args.contextualClass);
    }

    return classes.join(' ');
  }

  @action
  appendDescriptor(element: HTMLElement): void {
    registerAriaDescriptionElement(this as AriaDescribedByComponent, element);
  }

  @action removeDescriptor(element: HTMLElement): void {
    unregisterAriaDescriptionElement(this as AriaDescribedByComponent, element);
  }
}
