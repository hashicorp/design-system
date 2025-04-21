/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsAppFooterItemSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

const HdsAppFooterItem: TOC<HdsAppFooterItemSignature> = <template>
  <li class="hds-app-footer__list-item" ...attributes>
    {{yield}}
  </li>
</template>;

export default HdsAppFooterItem;
