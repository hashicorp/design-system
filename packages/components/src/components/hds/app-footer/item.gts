/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsAppFooterItemSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

const HdsAppFooterItem: TemplateOnlyComponent<HdsAppFooterItemSignature> =
  <template>
    <li class="hds-app-footer__list-item" ...attributes>
      {{yield}}
    </li>
  </template>;

export default HdsAppFooterItem;
