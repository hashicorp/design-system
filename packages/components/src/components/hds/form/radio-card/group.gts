/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import type { WithBoundArgs } from '@glint/template';

import HdsFormFieldset from '../fieldset/index.gts';
import HdsFormRadioCard from './index.gts';

import type { HdsFormFieldsetSignature } from '../fieldset/index.gts';
import type {
  HdsFormRadioCardControlPositions,
  HdsFormRadioCardAlignments,
} from './types.ts';

export interface HdsFormRadioCardGroupSignature {
  Args: HdsFormFieldsetSignature['Args'] & {
    controlPosition?: HdsFormRadioCardControlPositions;
    alignment?: HdsFormRadioCardAlignments;
    name?: string;
  };
  Blocks: {
    default: [
      {
        Legend?: HdsFormFieldsetSignature['Blocks']['default'][0]['Legend'];
        HelperText?: HdsFormFieldsetSignature['Blocks']['default'][0]['HelperText'];
        RadioCard?: WithBoundArgs<
          typeof HdsFormRadioCard,
          'name' | 'alignment' | 'controlPosition' | 'extraAriaDescribedBy'
        >;
        Error?: HdsFormFieldsetSignature['Blocks']['default'][0]['Error'];
      },
    ];
  };
  Element: HdsFormFieldsetSignature['Element'];
}

const HdsFormRadioCardGroup: TemplateOnlyComponent<HdsFormRadioCardGroupSignature> =
  <template>
    <HdsFormFieldset
      class="hds-form-group--radio-cards"
      @layout={{if (eq @layout "vertical") "vertical" "horizontal"}}
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
            RadioCard=(component
              HdsFormRadioCard
              name=@name
              alignment=@alignment
              controlPosition=@controlPosition
              extraAriaDescribedBy=F.ariaDescribedBy
            )
          )
        }}
      </F.Control>
    </HdsFormFieldset>
  </template>;

export default HdsFormRadioCardGroup;
