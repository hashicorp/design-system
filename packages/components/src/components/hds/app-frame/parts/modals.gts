/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsAppFrameModalsSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const HdsAppFrameModals: TOC<HdsAppFrameModalsSignature> = <template>
  {{! we use :empty in CSS so we have to avoid whitespaces }}
  <div class="hds-app-frame__modals" ...attributes>{{~yield~}}</div>
</template>;

export default HdsAppFrameModals;
