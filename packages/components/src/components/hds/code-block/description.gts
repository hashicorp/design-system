/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsTextBody from '../text/body.gts';

import type { TOC } from '@ember/component/template-only';
import type { HdsTextBodySignature } from '../text/body.gts';

export interface HdsCodeBlockDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsCodeBlockDescription: TOC<HdsCodeBlockDescriptionSignature> =
  <template>
    <HdsTextBody
      @tag="p"
      @size="100"
      class="hds-code-block__description"
      ...attributes
    >
      {{yield}}
    </HdsTextBody>
  </template>;

export default HdsCodeBlockDescription;
