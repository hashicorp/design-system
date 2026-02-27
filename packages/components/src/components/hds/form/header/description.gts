/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import HdsTextBody from '../../text/body.gts';

import type { HdsTextBodySignature } from '../../text/body.gts';

export interface HdsFormHeaderDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsFormHeaderDescription: TemplateOnlyComponent<HdsFormHeaderDescriptionSignature> =
  <template>
    <HdsTextBody
      class="hds-form__header-description"
      @tag="p"
      @size="300"
      @color="primary"
      ...attributes
    >
      {{yield}}
    </HdsTextBody>
  </template>;
export default HdsFormHeaderDescription;
