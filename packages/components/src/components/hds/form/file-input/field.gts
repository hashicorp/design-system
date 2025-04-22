/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { hash } from '@ember/helper';

import HdsFormField from '../field/index.gts';
import HdsFormFileInputBase from './base.gts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import type { HdsFormFieldSignature } from '../field/index.gts';
import type { HdsFormLabelSignature } from '../label/index.gts';
import type { HdsFormHelperTextSignature } from '../helper-text/index.gts';
import type { HdsFormErrorSignature } from '../error/index.gts';

export interface HdsFormFileInputFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'>;
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

const HdsFormFileInputField: TOC<HdsFormFileInputFieldSignature> = <template>
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
    <F.Control>
      <HdsFormFileInputBase
        required={{@isRequired}}
        ...attributes
        id={{F.id}}
        aria-describedby={{F.ariaDescribedBy}}
      />
    </F.Control>
  </HdsFormField>
</template>;

export default HdsFormFileInputField;
