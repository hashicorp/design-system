/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsAppFrameFooterSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const HdsAppFrameFooter: TOC<HdsAppFrameFooterSignature> = <template>
  <footer class="hds-app-frame__footer" ...attributes>
    {{yield}}
  </footer>
</template>;

export default HdsAppFrameFooter;
