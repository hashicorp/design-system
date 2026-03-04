/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import HdsIcon from '../../icon/index.gts';

export interface HdsDropdownToggleChevronSignature {
  Element: HTMLDivElement;
}

const HdsDropdownToggleChevron: TemplateOnlyComponent<HdsDropdownToggleChevronSignature> =
  <template>
    <div class="hds-dropdown-toggle-chevron">
      <HdsIcon @name="chevron-down" />
    </div>
  </template>;

export default HdsDropdownToggleChevron;
