/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { hash } from '@ember/helper';

import HdsFormLegend from '../legend/index.gts';
import HdsFormHelperText from '../helper-text/index.gts';
import HdsFormError from '../error/index.gts';
import { getElementId } from '../../../../utils/hds-get-element-id.ts';
import {
  ariaDescribedBy,
  registerAriaDescriptionElement,
  unregisterAriaDescriptionElement,
} from '../../../../utils/hds-aria-described-by.ts';
import { HdsFormFieldsetLayoutValues } from './types.ts';
import HdsFormLegendComponent from '../legend/index.gts';
import HdsFormHelperTextComponent from '../helper-text/index.gts';
import HdsFormErrorComponent from '../error/index.gts';

import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type { HdsFormFieldsetLayouts } from './types.ts';
import type { HdsYieldSignature } from '../../yield/index.gts';
import type { AriaDescribedByComponent } from '../../../../utils/hds-aria-described-by.ts';
import HdsYield from '../../yield/index.gts';

export interface HdsFormFieldsetSignature {
  Args: {
    extraAriaDescribedBy?: string;
    isOptional?: boolean;
    isRequired?: boolean;
    layout?: HdsFormFieldsetLayouts;
  };
  Blocks: {
    default: [
      {
        Legend?: WithBoundArgs<
          typeof HdsFormLegendComponent,
          'contextualClass' | 'isRequired' | 'isOptional'
        >;
        HelperText?: WithBoundArgs<
          typeof HdsFormHelperTextComponent,
          'contextualClass' | 'controlId' | 'onInsert'
        >;
        Control?: ComponentLike<HdsYieldSignature>;
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

// @ts-expect-error: decorator function return type 'ClassOf<AriaDescribedByComponent>' is not assignable to 'typeof HdsFormFieldComponent'
@ariaDescribedBy
export default class HdsFormFieldset extends Component<HdsFormFieldsetSignature> {
  /**
   * Sets the layout of the group
   *
   * @param layout
   * @type {enum}
   * @default 'vertical'
   */
  get layout(): HdsFormFieldsetLayouts {
    return this.args.layout ?? HdsFormFieldsetLayoutValues.Vertical;
  }

  /**
   * Calculates the unique ID to assign to the fieldset
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
    // we just need a class for the layout
    const classes = ['hds-form-group'];

    // add a class based on the @layout argument
    classes.push(`hds-form-group--layout-${this.layout}`);

    return classes.join(' ');
  }

  @action
  appendDescriptor(element: HTMLElement): void {
    registerAriaDescriptionElement(this as AriaDescribedByComponent, element);
  }

  @action removeDescriptor(element: HTMLElement): void {
    unregisterAriaDescriptionElement(this as AriaDescribedByComponent, element);
  }

  <template>
    <fieldset class={{this.classNames}} id={{this.id}} ...attributes>
      {{yield
        (hash
          Legend=(component
            HdsFormLegend
            isRequired=this.isRequired
            isOptional=this.isOptional
            contextualClass="hds-form-group__legend"
          )
        )
      }}
      {{yield
        (hash
          HelperText=(component
            HdsFormHelperText
            controlId=this.id
            onInsert=this.appendDescriptor
            contextualClass="hds-form-group__helper-text"
          )
        )
      }}
      <div class="hds-form-group__control-fields-wrapper">
        {{! @glint-expect-error }}{{! prettier-ignore}}
        {{yield (hash Control=HdsYield ariaDescribedBy=this.ariaDescribedBy)}}
      </div>
      {{yield
        (hash
          Error=(component
            HdsFormError
            controlId=this.id
            onInsert=this.appendDescriptor
            onRemove=this.removeDescriptor
            contextualClass="hds-form-group__error"
          )
        )
      }}
    </fieldset>
  </template>
}
