/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsDropdownListItemSeparatorSignature {
  Element: HTMLLIElement;
}

const HdsDropdownListItemSeparator: TemplateOnlyComponent<HdsDropdownListItemSeparatorSignature> =
  <template>
    <li
      class="hds-dropdown-list-item hds-dropdown-list-item--variant-separator"
      aria-hidden="true"
      role="separator"
      ...attributes
    ></li>
  </template>;

export default HdsDropdownListItemSeparator;
