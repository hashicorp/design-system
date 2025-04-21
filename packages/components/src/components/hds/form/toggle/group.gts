/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { hash } from '@ember/helper';

import HdsFormFieldset from '../fieldset/index.gts';
import HdsFormToggleField from './field.gts';

import type { TOC } from '@ember/component/template-only';
import type { HdsFormFieldsetSignature } from '../fieldset/index.gts';
import type { ComponentLike } from '@glint/template';
import type { HdsFormLegendSignature } from '../legend/index.gts';
import type { HdsFormHelperTextSignature } from '../helper-text/index.gts';
import type { HdsFormToggleFieldSignature } from './field.gts';
import type { HdsFormErrorSignature } from '../error/index.gts';

export interface HdsFormToggleGroupSignature {
  Args: HdsFormFieldsetSignature['Args'] & {
    name?: string;
  };
  Blocks: {
    default: [
      {
        Legend?: ComponentLike<HdsFormLegendSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        ToggleField?: ComponentLike<HdsFormToggleFieldSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
      },
    ];
  };
  Element: HdsFormFieldsetSignature['Element'];
}

const HdsFormToggleGroup: TOC<HdsFormToggleGroupSignature> = <template>
  <HdsFormFieldset
    @layout={{@layout}}
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
          ToggleField=(component
            HdsFormToggleField
            contextualClass="hds-form-group__control-field"
            isRequired=@isRequired
            extraAriaDescribedBy=F.ariaDescribedBy
          )
        )
      }}
    </F.Control>
  </HdsFormFieldset>
</template>;

export default HdsFormToggleGroup;
