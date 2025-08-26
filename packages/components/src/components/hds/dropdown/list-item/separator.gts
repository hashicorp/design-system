/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsDropdownListItemSeparatorSignature {
  Element: HTMLLIElement;
}

const HdsDropdownListItemSeparator: TOC<HdsDropdownListItemSeparatorSignature> =
  <template>
    <li
      class="hds-dropdown-list-item hds-dropdown-list-item--variant-separator"
      aria-hidden="true"
      role="separator"
      ...attributes
    ></li>
  </template>;

export default HdsDropdownListItemSeparator;
