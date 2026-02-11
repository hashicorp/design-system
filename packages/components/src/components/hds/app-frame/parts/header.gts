/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsAppFrameHeaderSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const HdsAppFrameHeader: TemplateOnlyComponent<HdsAppFrameHeaderSignature> =
  <template>
    <header class="hds-app-frame__header" ...attributes>
      {{yield}}
    </header>
  </template>;

export default HdsAppFrameHeader;
