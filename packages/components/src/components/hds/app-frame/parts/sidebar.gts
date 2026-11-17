/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import hdsT from '../../../../helpers/hds-t.ts';

export interface HdsAppFrameSidebarSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const HdsAppFrameSidebar: TemplateOnlyComponent<HdsAppFrameSidebarSignature> =
  <template>
    <aside
      class="hds-app-frame__sidebar"
      aria-label={{hdsT
        "hds.components.app-frame.sidebar.aria-label"
        default="Sidebar"
      }}
      ...attributes
    >
      {{yield}}
    </aside>
  </template>;

export default HdsAppFrameSidebar;
