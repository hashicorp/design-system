/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsAppFrameFooterSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const HdsAppFrameFooter: TemplateOnlyComponent<HdsAppFrameFooterSignature> =
  <template>
    <footer class="hds-app-frame__footer" ...attributes>
      {{yield}}
    </footer>
  </template>;

export default HdsAppFrameFooter;
