/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsSideNavBaseSignature {
  Blocks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    root?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    header?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    footer?: any;
  };
  Element: HTMLDivElement;
}

const HdsSideNavBase: TOC<HdsSideNavBaseSignature> = <template>
  {{! IMPORTANT: we need to add "squishies" here (~) because otherwise the whitespace added by Ember causes the empty element to still have visible padding - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}
  <div class="hds-side-nav" ...attributes>
    <h2 class="sr-only" id="hds-side-nav-header">Application local navigation</h2>

    <div class="hds-side-nav__wrapper">
      {{yield to="root"}}
      <div class="hds-side-nav__wrapper-header">
        {{~yield to="header"~}}
      </div>
      <div class="hds-side-nav__wrapper-body">
        {{~yield to="body"~}}
      </div>
      <div class="hds-side-nav__wrapper-footer">
        {{~yield to="footer"~}}
      </div>
    </div>
  </div>
</template>;

export default HdsSideNavBase;
