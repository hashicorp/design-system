/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { hash } from '@ember/helper';

import HdsFormField from '../field/index.gts';
import HdsFormMaskedInputBase from './base.gts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type HdsFormCharacterCountComponent from '../character-count/index.gts';
import type { HdsFormErrorSignature } from '../error/index.gts';
import type { HdsFormFieldSignature } from '../field/index.gts';
import type { HdsFormHelperTextSignature } from '../helper-text/index.gts';
import type { HdsFormLabelSignature } from '../label/index.gts';
import type { HdsFormMaskedInputBaseSignature } from './base.gts';
import { EnsureSafeComponentHelper as ensureSafeComponent } from '@embroider/util';

export interface HdsFormMaskedInputFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'> &
    HdsFormMaskedInputBaseSignature['Args'];
  Blocks: {
    default: [
      {
        Label?: ComponentLike<HdsFormLabelSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
        CharacterCount?: WithBoundArgs<
          typeof HdsFormCharacterCountComponent,
          'value'
        >;
      },
    ];
  };
  Element: HdsFormFieldSignature['Element'];
}

const HdsFormMaskedInputField: TOC<HdsFormMaskedInputFieldSignature> =
  <template>
    <HdsFormField
      @layout="vertical"
      @extraAriaDescribedBy={{@extraAriaDescribedBy}}
      @isRequired={{@isRequired}}
      @isOptional={{@isOptional}}
      @id={{@id}}
      as |F|
    >
      {{! Notice: the order of the elements is not relevant here, because is controlled at "Hds::Form::Field" component level }}
      {{yield (hash Label=F.Label HelperText=F.HelperText Error=F.Error)}}
      {{#if F.CharacterCount}}
        {{yield
          (hash
            CharacterCount=(component
              (ensureSafeComponent F.CharacterCount) value=@value
            )
          )
        }}
      {{/if}}
      <F.Control>
        <HdsFormMaskedInputBase
          @hasCopyButton={{@hasCopyButton}}
          @isMultiline={{@isMultiline}}
          @isContentMasked={{@isContentMasked}}
          @visibilityToggleAriaLabel={{@visibilityToggleAriaLabel}}
          @visibilityToggleAriaMessageText={{@visibilityToggleAriaMessageText}}
          @value={{@value}}
          @isInvalid={{@isInvalid}}
          @width={{@width}}
          @height={{@height}}
          @id={{F.id}}
          required={{@isRequired}}
          ...attributes
          aria-describedby={{F.ariaDescribedBy}}
        />
      </F.Control>
    </HdsFormField>
  </template>;

export default HdsFormMaskedInputField;
