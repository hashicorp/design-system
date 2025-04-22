/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsSideNavListItemSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

const HdsSideNavListItem: TOC<HdsSideNavListItemSignature> = <template>
  <li class="hds-side-nav__list-item" ...attributes>
    {{yield}}
  </li>
</template>;

export default HdsSideNavListItem;
