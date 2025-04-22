/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsTextBody from '../../text/body.gts';

import type { TOC } from '@ember/component/template-only';
import type { HdsTextBodySignature } from '../../text/body.gts';

export interface HdsFormRadioCardDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsFormRadioCardDescription: TOC<HdsFormRadioCardDescriptionSignature> =
  <template>
    <HdsTextBody
      class="hds-form-radio-card__description"
      @tag="span"
      @size="100"
      ...attributes
    >{{yield}}</HdsTextBody>
  </template>;

export default HdsFormRadioCardDescription;
