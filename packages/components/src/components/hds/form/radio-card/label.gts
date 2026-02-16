/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import HdsTextDisplay from '../../text/display.gts';

import type { HdsTextDisplaySignature } from '../../text/display.gts';

export interface HdsFormRadioCardLabelSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextDisplaySignature['Element'];
}

const HdsFormRadioCardLabel: TemplateOnlyComponent<HdsFormRadioCardLabelSignature> =
  <template>
    <HdsTextDisplay
      class="hds-form-radio-card__label"
      @tag="span"
      @size="300"
      @weight="bold"
      ...attributes
    >{{yield}}</HdsTextDisplay>
  </template>;

export default HdsFormRadioCardLabel;
