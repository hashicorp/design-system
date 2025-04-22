/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsTextDisplay from '../../text/display.gts';

import type { TOC } from '@ember/component/template-only';
import type { HdsTextDisplaySignature } from '../../text/display.gts';

export interface HdsFormRadioCardLabelSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextDisplaySignature['Element'];
}

const HdsFormRadioCardLabel: TOC<HdsFormRadioCardLabelSignature> = <template>
  <HdsTextDisplay
    class="hds-form-radio-card__label"
    @tag="span"
    @size="300"
    @weight="bold"
    ...attributes
  >{{yield}}</HdsTextDisplay>
</template>;

export default HdsFormRadioCardLabel;
