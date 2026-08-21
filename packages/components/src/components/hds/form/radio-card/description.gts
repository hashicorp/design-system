/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import type { HdsTextBodySignature } from '../../text/body.gts';

export interface HdsFormRadioCardDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsFormRadioCardDescription: TemplateOnlyComponent<HdsFormRadioCardDescriptionSignature> =
  <template>
    <span
      class="hds-form-radio-card__description"
      ...attributes
    >{{yield}}</span>
  </template>;

export default HdsFormRadioCardDescription;
