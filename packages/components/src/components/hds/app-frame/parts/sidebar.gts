/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsAppFrameSidebarSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const HdsAppFrameSidebar: TOC<HdsAppFrameSidebarSignature> = <template>
  <aside class="hds-app-frame__sidebar" ...attributes>
    {{yield}}
  </aside>
</template>;

export default HdsAppFrameSidebar;
