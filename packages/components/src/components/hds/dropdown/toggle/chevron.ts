/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

interface HdsDropdownToggleChevronSignature {
  Element: HTMLDivElement;
}

const HdsDropdownToggleChevron =
  templateOnlyComponent<HdsDropdownToggleChevronSignature>();

export default HdsDropdownToggleChevron;
