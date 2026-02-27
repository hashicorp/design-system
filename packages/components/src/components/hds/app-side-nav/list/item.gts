/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsAppSideNavListItemSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

const HdsAppSideNavListItem: TemplateOnlyComponent<HdsAppSideNavListItemSignature> =
  <template>
    <li class="hds-app-side-nav__list-item" ...attributes>
      {{yield}}
    </li>
  </template>;

export default HdsAppSideNavListItem;
