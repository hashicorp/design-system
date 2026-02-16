/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import HdsTextBody from '../../text/body.gts';

import type { HdsTextBodySignature } from '../../text/body.gts';

export interface HdsFormRadioCardDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsFormRadioCardDescription: TemplateOnlyComponent<HdsFormRadioCardDescriptionSignature> =
  <template>
    <HdsTextBody
      class="hds-form-radio-card__description"
      @tag="span"
      @size="100"
      ...attributes
    >{{yield}}</HdsTextBody>
  </template>;

export default HdsFormRadioCardDescription;
