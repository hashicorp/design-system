/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import type { WithBoundArgs } from '@glint/template';

import { getElementId } from '../../../../utils/hds-get-element-id.ts';
import {
  ariaDescribedBy,
  registerAriaDescriptionElement,
  unregisterAriaDescriptionElement,
} from '../../../../utils/hds-aria-described-by.ts';
import { HdsFormFieldLayoutValues } from './types.ts';
import HdsFormLabel from '../label/index.gts';
import HdsFormHelperText from '../helper-text/index.gts';
import HdsFormCharacterCount from '../character-count/index.gts';
import HdsFormError from '../error/index.gts';
import HdsYield from '../../yield/index.gts';

import type { HdsFormFieldLayouts } from './types.ts';
import type { AriaDescribedByComponent } from '../../../../utils/hds-aria-described-by.ts';

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
          typeof HdsFormLabel,
          'contextualClass' | 'controlId' | 'isRequired' | 'isOptional'
        >;
        HelperText?: WithBoundArgs<
          typeof HdsFormHelperText,
          'contextualClass' | 'controlId' | 'onInsert'
        >;
        Control?: typeof HdsYield;
        CharacterCount?: WithBoundArgs<
          typeof HdsFormCharacterCount,
          'contextualClass' | 'controlId' | 'onInsert'
        >;
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

// @ts-expect-error: decorator function return type 'ClassOf<AriaDescribedBy>' is not assignable to 'typeof HdsFormField'
@ariaDescribedBy
export default class HdsFormField extends Component<HdsFormFieldSignature> {
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

  appendDescriptor = (element: HTMLElement): void => {
    registerAriaDescriptionElement(this as AriaDescribedByComponent, element);
  };

  removeDescriptor = (element: HTMLElement): void => {
    unregisterAriaDescriptionElement(this as AriaDescribedByComponent, element);
  };

  <template>
    <div class={{this.classNames}} ...attributes>
      {{yield
        (hash
          Label=(component
            HdsFormLabel
            controlId=this.id
            isRequired=this.isRequired
            isOptional=this.isOptional
            contextualClass="hds-form-field__label"
          )
        )
      }}
      {{#unless (eq @layout "flag")}}
        {{yield
          (hash
            HelperText=(component
              HdsFormHelperText
              controlId=this.id
              onInsert=this.appendDescriptor
              contextualClass="hds-form-field__helper-text"
            )
          )
        }}
      {{/unless}}
      {{! @glint-expect-error }}
      {{#let this.ariaDescribedBy as |ariaDescribedBy|}}
        <div class="hds-form-field__control">
          {{yield
            (hash Control=HdsYield id=this.id ariaDescribedBy=ariaDescribedBy)
          }}
        </div>
      {{/let}}
      {{#if (eq @layout "flag")}}
        {{yield
          (hash
            HelperText=(component
              HdsFormHelperText
              controlId=this.id
              onInsert=this.appendDescriptor
              contextualClass="hds-form-field__helper-text"
            )
          )
        }}
      {{/if}}
      {{yield
        (hash
          CharacterCount=(component
            HdsFormCharacterCount
            controlId=this.id
            onInsert=this.appendDescriptor
            contextualClass="hds-form-field__character-count"
          )
        )
      }}
      {{yield
        (hash
          Error=(component
            HdsFormError
            controlId=this.id
            onInsert=this.appendDescriptor
            onRemove=this.removeDescriptor
            contextualClass="hds-form-field__error"
          )
        )
      }}
    </div>
  </template>
}
