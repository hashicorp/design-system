/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';

import { getElementId } from '../../../../utils/hds-get-element-id.ts';
import {
  ariaDescribedBy,
  registerAriaDescriptionElement,
  unregisterAriaDescriptionElement,
} from '../../../../utils/hds-aria-described-by.ts';
import { HdsFormFieldsetLayoutValues } from './types.ts';
import HdsFormLegend from '../legend/index.gts';
import HdsFormHelperText from '../helper-text/index.gts';
import HdsFormError from '../error/index.gts';
import HdsYield from '../../yield/index.gts';

import type { HdsFormFieldsetLayouts } from './types.ts';
import type { AriaDescribedByComponent } from '../../../../utils/hds-aria-described-by.ts';

export const LAYOUT_TYPES: HdsFormFieldsetLayouts[] = Object.values(
  HdsFormFieldsetLayoutValues
);

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
          typeof HdsFormLegend,
          'contextualClass' | 'isRequired' | 'isOptional'
        >;
        HelperText?: WithBoundArgs<
          typeof HdsFormHelperText,
          'contextualClass' | 'controlId' | 'onInsert'
        >;
        Control?: typeof HdsYield;
        Error?: WithBoundArgs<
          typeof HdsFormError,
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
  get layout(): HdsFormFieldsetLayouts {
    return this.args.layout ?? HdsFormFieldsetLayoutValues.Vertical;
  }

  get id(): string {
    return getElementId(this);
  }

  get isRequired(): boolean {
    return this.args.isRequired || false;
  }

  get isOptional(): boolean {
    return this.args.isOptional || false;
  }

  get classNames(): string {
    // we just need a class for the layout
    const classes = ['hds-form-group'];

    // add a class based on the @layout argument
    classes.push(`hds-form-group--layout-${this.layout}`);

    return classes.join(' ');
  }

  appendDescriptor = (element: HTMLElement): void => {
    registerAriaDescriptionElement(this as AriaDescribedByComponent, element);
  };

  removeDescriptor = (element: HTMLElement): void => {
    unregisterAriaDescriptionElement(this as AriaDescribedByComponent, element);
  };

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
        {{! @glint-expect-error }}
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
