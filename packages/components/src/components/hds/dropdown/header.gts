/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsDropdownHeaderSignature {
  Args: {
    hasDivider?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsDropdownHeader: TemplateOnlyComponent<HdsDropdownHeaderSignature> =
  <template>
    <div
      class="hds-dropdown__header
        {{if @hasDivider 'hds-dropdown__header--with-divider'}}"
      ...attributes
    >
      {{yield}}
    </div>
  </template>;

export default HdsDropdownHeader;
