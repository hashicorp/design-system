/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { hash } from '@ember/helper';
import { EnsureSafeComponentHelper as ensureSafeComponent } from '@embroider/util';
import HdsFormField from '../field/index.gts';
import HdsFormTextareaBase from './base.gts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type { HdsFormFieldSignature } from '../field/index.gts';
import type { HdsFormTextareaBaseSignature } from './base.gts';
import type { HdsFormErrorSignature } from '../error/index.gts';
import type { HdsFormHelperTextSignature } from '../helper-text/index.gts';
import type { HdsFormLabelSignature } from '../label/index.gts';
import type HdsFormCharacterCountComponent from '../character-count/index.gts';

export interface HdsFormTextareaFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'> &
    HdsFormTextareaBaseSignature['Args'];
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

const HdsFormTextareaField: TOC<HdsFormTextareaFieldSignature> = <template>
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
