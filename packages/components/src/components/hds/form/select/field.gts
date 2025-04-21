/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { hash } from '@ember/helper';

import HdsFormField from '../field/index.gts';
import HdsFormSelectBase from './base.gts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import type { HdsFormErrorSignature } from '../error/index.gts';
import type { HdsFormFieldSignature } from '../field/index.gts';
import type { HdsFormHelperTextSignature } from '../helper-text/index.gts';
import type { HdsFormLabelSignature } from '../label/index.gts';
import type { HdsFormSelectBaseSignature } from './base.gts';
import type { HdsYieldSignature } from '../../yield/index.gts';

export interface HdsFormSelectFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'> &
    HdsFormSelectBaseSignature['Args'];
  Blocks: {
    default: [
      {
        Label?: ComponentLike<HdsFormLabelSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
        Options?: ComponentLike<HdsYieldSignature>;
      },
    ];
  };
  Element: HdsFormFieldSignature['Element'];
}

const HdsFormSelectField: TOC<HdsFormSelectFieldSignature> = <template>
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
