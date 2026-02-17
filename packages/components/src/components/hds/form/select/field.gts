/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import HdsYield from '../../yield/index.gts';
import HdsFormField from '../field/index.gts';
import HdsFormSelectBase from './base.gts';

import type { HdsFormFieldSignature } from '../field';
import type { HdsFormSelectBaseSignature } from './base.gts';

export interface HdsFormSelectFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'> &
    HdsFormSelectBaseSignature['Args'];
  Blocks: {
    default: [
      {
        Label?: HdsFormFieldSignature['Blocks']['default'][0]['Label'];
        HelperText?: HdsFormFieldSignature['Blocks']['default'][0]['HelperText'];
        Error?: HdsFormFieldSignature['Blocks']['default'][0]['Error'];
        Options?: typeof HdsYield;
      },
    ];
  };
  Element: HdsFormFieldSignature['Element'];
}

const HdsFormSelectField: TemplateOnlyComponent<HdsFormSelectFieldSignature> =
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
      <F.Control>
        <HdsFormSelectBase
          @isInvalid={{@isInvalid}}
          @width={{@width}}
          required={{@isRequired}}
          ...attributes
          id={{F.id}}
          aria-describedby={{F.ariaDescribedBy}}
          as |S|
        >
          {{yield (hash Options=S.Options)}}
        </HdsFormSelectBase>
      </F.Control>
    </HdsFormField>
  </template>;

export default HdsFormSelectField;
