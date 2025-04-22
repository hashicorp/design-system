/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsDropdownListItemGenericSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

const HdsDropdownListItemGeneric: TOC<HdsDropdownListItemGenericSignature> =
  <template>
    <li
      class="hds-dropdown-list-item hds-dropdown-list-item--variant-generic"
      ...attributes
    >
      {{yield}}
    </li>
  </template>;

export default HdsDropdownListItemGeneric;
