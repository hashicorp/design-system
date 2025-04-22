/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsSideNavHeaderSignature {
  Blocks: {
    logo?: [];
    actions?: [];
  };
  Element: HTMLDivElement;
}

const HdsSideNavHeader: TOC<HdsSideNavHeaderSignature> = <template>
  {{! IMPORTANT: we need to add "squishies" here (~) because otherwise the whitespace added by Ember causes the empty element to still have visible padding - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}
  <div class="hds-side-nav-header" ...attributes>
    <div class="hds-side-nav-header__logo-container">
      {{~yield to="logo"~}}
    </div>
    <div
      class="hds-side-nav-header__actions-container hds-side-nav-hide-when-minimized"
    >
      {{~yield to="actions"~}}
    </div>
  </div>
</template>;

export default HdsSideNavHeader;
