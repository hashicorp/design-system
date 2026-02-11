/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsAppFrameSidebarSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const HdsAppFrameSidebar: TemplateOnlyComponent<HdsAppFrameSidebarSignature> =
  <template>
    <aside class="hds-app-frame__sidebar" ...attributes>
      {{yield}}
    </aside>
  </template>;

export default HdsAppFrameSidebar;
