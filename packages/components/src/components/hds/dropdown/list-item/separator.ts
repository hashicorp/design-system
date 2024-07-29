/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsDropdownListItemSeparatorSignature {
  Element: HTMLLIElement;
}

const HdsDropdownListItemSeparatorComponent =
  templateOnlyComponent<HdsDropdownListItemSeparatorSignature>();

export default HdsDropdownListItemSeparatorComponent;
