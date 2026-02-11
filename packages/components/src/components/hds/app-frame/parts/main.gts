/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsAppFrameMainSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const HdsAppFrameMain: TemplateOnlyComponent<HdsAppFrameMainSignature> =
  <template>
    <main class="hds-app-frame__main" id="hds-main" ...attributes>
      {{yield}}
    </main>
  </template>;

export default HdsAppFrameMain;
