/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';

import HdsFormFieldset from '../fieldset/index.gts';
import HdsFormRadioField from './field.gts';

import type { HdsFormFieldsetSignature } from '../fieldset/index.gts';

export interface HdsFormRadioGroupSignature {
  Args: HdsFormFieldsetSignature['Args'] & {
    name?: string;
  };
  Blocks: {
    default: [
      {
        Legend?: HdsFormFieldsetSignature['Blocks']['default'][0]['Legend'];
        HelperText?: HdsFormFieldsetSignature['Blocks']['default'][0]['HelperText'];
        RadioField?: WithBoundArgs<
          typeof HdsFormRadioField,
          'name' | 'isRequired' | 'extraAriaDescribedBy' | 'contextualClass'
        >;
        Error?: HdsFormFieldsetSignature['Blocks']['default'][0]['Error'];
      },
    ];
  };
  Element: HdsFormFieldsetSignature['Element'];
}

const HdsFormRadioGroup: TemplateOnlyComponent<HdsFormRadioGroupSignature> =
  <template>
    <HdsFormFieldset
      @layout={{@layout}}
      @isRequired={{@isRequired}}
      @isOptional={{@isOptional}}
      ...attributes
      as |F|
    >
      {{! Notice: the order of the elements is not relevant here, because it's controlled at "HdsFormFieldset" component level }}
      {{yield (hash Legend=F.Legend HelperText=F.HelperText Error=F.Error)}}
      <F.Control>
        {{yield
          (hash
            RadioField=(component
              HdsFormRadioField
              contextualClass="hds-form-group__control-field"
              isRequired=@isRequired
              name=@name
              extraAriaDescribedBy=F.ariaDescribedBy
            )
          )
        }}
      </F.Control>
    </HdsFormFieldset>
  </template>;

export default HdsFormRadioGroup;
