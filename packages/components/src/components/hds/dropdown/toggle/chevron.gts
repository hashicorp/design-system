/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsIcon from '../../icon/index.gts';

import type { TOC } from '@ember/component/template-only';

export interface HdsDropdownToggleChevronSignature {
  Element: HTMLDivElement;
}

const HdsDropdownToggleChevron: TOC<HdsDropdownToggleChevronSignature> =
  <template>
    <div class="hds-dropdown-toggle-chevron">
      <HdsIcon @name="chevron-down" />
    </div>
  </template>;

export default HdsDropdownToggleChevron;
