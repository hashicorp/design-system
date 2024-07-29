/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsDropdownListItemGenericSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

const HdsDropdownListItemGenericComponent =
  templateOnlyComponent<HdsDropdownListItemGenericSignature>();

export default HdsDropdownListItemGenericComponent;
