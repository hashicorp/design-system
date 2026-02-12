/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import HdsFormField from '../field/index.gts';
import HdsFormToggleBase from './base.gts';

import type { HdsFormFieldSignature } from '../field/index.gts';

export interface HdsFormToggleFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'isOptional'> & {
    value?: string;
  };
  Blocks: {
    default: [
      {
        Label?: HdsFormFieldSignature['Blocks']['default'][0]['Label'];
        HelperText?: HdsFormFieldSignature['Blocks']['default'][0]['HelperText'];
        Error?: HdsFormFieldSignature['Blocks']['default'][0]['Error'];
      },
    ];
  };
  Element: HdsFormFieldSignature['Element'];
}

const HdsFormToggleField: TemplateOnlyComponent<HdsFormToggleFieldSignature> =
  <template>
    <HdsFormField
      @layout="flag"
      @contextualClass={{@contextualClass}}
      @extraAriaDescribedBy={{@extraAriaDescribedBy}}
      @id={{@id}}
      as |F|
    >
      {{! Notice: the order of the elements is not relevant here, because is controlled at "HdsFormField" component level }}
      {{yield (hash Label=F.Label HelperText=F.HelperText Error=F.Error)}}
      <F.Control>
        <HdsFormToggleBase
          @value={{@value}}
          required={{@isRequired}}
          ...attributes
          id={{F.id}}
          aria-describedby={{F.ariaDescribedBy}}
        />
      </F.Control>
    </HdsFormField>
  </template>;

export default HdsFormToggleField;
