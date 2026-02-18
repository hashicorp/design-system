/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import HdsFormSectionMultiFieldGroupItem from './item.gts';

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
