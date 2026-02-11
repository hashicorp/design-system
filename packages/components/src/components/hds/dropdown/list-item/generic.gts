/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsDropdownListItemGenericSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

const HdsDropdownListItemGeneric: TemplateOnlyComponent<HdsDropdownListItemGenericSignature> =
  <template>
    <li
      class="hds-dropdown-list-item hds-dropdown-list-item--variant-generic"
      ...attributes
    >
      {{yield}}
    </li>
  </template>;

export default HdsDropdownListItemGeneric;
