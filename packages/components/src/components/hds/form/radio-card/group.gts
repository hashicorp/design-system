/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { hash } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import HdsFormRadioCard from './index.gts';
import HdsFormFieldset from '../fieldset/index.gts';

import type { TOC } from '@ember/component/template-only';
import type { HdsFormFieldsetSignature } from '../fieldset/index.gts';
import type { ComponentLike } from '@glint/template';
import type { HdsFormLegendSignature } from '../legend/index.gts';
import type { HdsFormHelperTextSignature } from '../helper-text/index.gts';
import type { HdsFormRadioCardSignature } from './index.gts';
import type { HdsFormErrorSignature } from '../error/index.gts';
import type {
  HdsFormRadioCardControlPositions,
  HdsFormRadioCardAlignments,
} from './types';

export interface HdsFormRadioCardGroupSignature {
  Args: HdsFormFieldsetSignature['Args'] & {
    controlPosition?: HdsFormRadioCardControlPositions;
    alignment?: HdsFormRadioCardAlignments;
    name?: string;
  };
  Blocks: {
    default: [
      {
        Legend?: ComponentLike<HdsFormLegendSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        RadioCard?: ComponentLike<HdsFormRadioCardSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
      },
    ];
  };
  Element: HdsFormFieldsetSignature['Element'];
}

const HdsFormRadioCardGroup: TOC<HdsFormRadioCardGroupSignature> = <template>
  <HdsFormFieldset
    class="hds-form-group--radio-cards"
    @layout={{if (eq @layout "vertical") "vertical" "horizontal"}}
    @isRequired={{@isRequired}}
    @isOptional={{@isOptional}}
    ...attributes
    as |F|
  >
    {{! Notice: the order of the elements is not relevant here, because it's controlled at "Hds::Form::Fieldset" component level }}
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
