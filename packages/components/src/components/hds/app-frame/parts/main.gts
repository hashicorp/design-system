/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsAppFrameMainSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const HdsAppFrameMain: TOC<HdsAppFrameMainSignature> = <template>
  <main class="hds-app-frame__main" id="hds-main" ...attributes>
    {{yield}}
  </main>
</template>;

export default HdsAppFrameMain;
