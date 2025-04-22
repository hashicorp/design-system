/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsAppSideNavListItemSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

const HdsAppSideNavListItem: TOC<HdsAppSideNavListItemSignature> = <template>
  <li class="hds-app-side-nav__list-item" ...attributes>
    {{yield}}
  </li>
</template>;

export default HdsAppSideNavListItem;
