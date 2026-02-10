/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import HdsFormField from '../field/index.gts';
import HdsFormRadioBase from './base.gts';
import HdsFormLabel from '../label/index.gts';
import HdsFormHelperText from '../helper-text/index.gts';
import HdsFormError from '../error/index.gts';

import type { HdsFormFieldSignature } from '../field/index.gts';

export interface HdsFormRadioFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'isOptional'> & {
    value?: string;
    name?: string;
  };
  Blocks: {
    default: [
      {
        Label?: typeof HdsFormLabel;
        HelperText?: typeof HdsFormHelperText;
        Error?: typeof HdsFormError;
      },
    ];
  };
  Element: HdsFormFieldSignature['Element'];
}

const HdsFormRadioField: TemplateOnlyComponent<HdsFormRadioFieldSignature> =
  <template>
    <HdsFormField
      @layout="flag"
      @contextualClass={{@contextualClass}}
      @extraAriaDescribedBy={{@extraAriaDescribedBy}}
      @id={{@id}}
      as |F|
    >
      {{! Notice: the order of the elements is not relevant here, because it's controlled at "HdsFormField" component level }}
      {{yield (hash Label=F.Label HelperText=F.HelperText Error=F.Error)}}
      <F.Control>
        <HdsFormRadioBase
          @value={{@value}}
          name={{@name}}
          required={{@isRequired}}
          ...attributes
          id={{F.id}}
          aria-describedby={{F.ariaDescribedBy}}
        />
      </F.Control>
    </HdsFormField>
  </template>;

export default HdsFormRadioField;
