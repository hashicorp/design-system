/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';

import HdsFormField from '../field/index.gts';
import HdsFormTextareaBase from './base.gts';

import type { HdsFormFieldSignature } from '../field/index.gts';
import type { HdsFormTextareaBaseSignature } from './base.gts';
import type HdsFormCharacterCountComponent from '../character-count/index.gts';

export interface HdsFormTextareaFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'> &
    HdsFormTextareaBaseSignature['Args'];
  Blocks: {
    default: [
      {
        Label?: HdsFormFieldSignature['Blocks']['default'][0]['Label'];
        HelperText?: HdsFormFieldSignature['Blocks']['default'][0]['HelperText'];
        Error?: HdsFormFieldSignature['Blocks']['default'][0]['Error'];
        CharacterCount?: WithBoundArgs<
          typeof HdsFormCharacterCountComponent,
          'value'
        >;
      },
    ];
  };
  Element: HdsFormFieldSignature['Element'];
}

const HdsFormTextareaField: TemplateOnlyComponent<HdsFormTextareaFieldSignature> =
  <template>
    <HdsFormField
      @layout="vertical"
      @extraAriaDescribedBy={{@extraAriaDescribedBy}}
      @isRequired={{@isRequired}}
      @isOptional={{@isOptional}}
      @id={{@id}}
      as |F|
    >
      {{! Notice: the order of the elements is not relevant here, because is controlled at "HdsFormField" component level }}
      {{yield (hash Label=F.Label HelperText=F.HelperText Error=F.Error)}}
      {{#if F.CharacterCount}}
        {{yield
          (hash CharacterCount=(component F.CharacterCount value=@value))
        }}
      {{/if}}
      <F.Control>
        <HdsFormTextareaBase
          @value={{@value}}
          @isInvalid={{@isInvalid}}
          @width={{@width}}
          @height={{@height}}
          required={{@isRequired}}
          ...attributes
          id={{F.id}}
          aria-describedby={{F.ariaDescribedBy}}
        />
      </F.Control>
    </HdsFormField>
  </template>;

export default HdsFormTextareaField;
