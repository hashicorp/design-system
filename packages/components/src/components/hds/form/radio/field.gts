/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { hash } from '@ember/helper';

import HdsFormField from '../field/index.gts';
import HdsFormRadioBase from './base.gts';

import type { TOC } from '@ember/component/template-only';
import type { HdsFormFieldSignature } from '../field/index.gts';
import type { ComponentLike } from '@glint/template';
import type { HdsFormLabelSignature } from '../label/index.gts';
import type { HdsFormHelperTextSignature } from '../helper-text/index.gts';
import type { HdsFormErrorSignature } from '../error/index.gts';

export interface HdsFormRadioFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'isOptional'> & {
    value?: string;
    name?: string;
  };
  Blocks: {
    default: [
      {
        Label?: ComponentLike<HdsFormLabelSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
      },
    ];
  };
  Element: HdsFormFieldSignature['Element'];
}

const HdsFormRadioField: TOC<HdsFormRadioFieldSignature> = <template>
  <HdsFormField
    @layout="flag"
    @contextualClass={{@contextualClass}}
    @extraAriaDescribedBy={{@extraAriaDescribedBy}}
    @id={{@id}}
    as |F|
  >
    {{! Notice: the order of the elements is not relevant here, because it's controlled at "Hds::Form::Field" component level }}
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
