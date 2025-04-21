/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsAppFrameHeaderSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const HdsAppFrameHeader: TOC<HdsAppFrameHeaderSignature> = <template>
  <header class="hds-app-frame__header" ...attributes>
    {{yield}}
  </header>
</template>;

export default HdsAppFrameHeader;
