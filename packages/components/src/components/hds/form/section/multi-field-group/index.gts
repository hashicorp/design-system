/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { hash } from '@ember/helper';
import HdsFormSectionMultiFieldGroupItem from './item.gts';

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsFormSectionMultiFieldGroupSignature {
  Blocks: {
    default: [
      {
        Item?: typeof HdsFormSectionMultiFieldGroupItem;
      },
    ];
  };
  Element: HTMLDivElement;
}

const HdsFormSectionMultiFieldGroup: TemplateOnlyComponent<HdsFormSectionMultiFieldGroupSignature> =
  <template>
    <div class="hds-form__section-multi-field-group" ...attributes>{{yield
        (hash Item=HdsFormSectionMultiFieldGroupItem)
      }}</div>
  </template>;

export default HdsFormSectionMultiFieldGroup;
