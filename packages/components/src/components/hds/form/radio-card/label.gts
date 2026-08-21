/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import type { HdsTextDisplaySignature } from '../../text/display.gts';

export interface HdsFormRadioCardLabelSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextDisplaySignature['Element'];
}

const HdsFormRadioCardLabel: TemplateOnlyComponent<HdsFormRadioCardLabelSignature> =
  <template>
    <span class="hds-form-radio-card__label" ...attributes>{{yield}}</span>
  </template>;

export default HdsFormRadioCardLabel;
