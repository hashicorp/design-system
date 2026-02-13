/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsDropdownFooterSignature {
  Args: {
    hasDivider?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsDropdownFooter: TemplateOnlyComponent<HdsDropdownFooterSignature> =
  <template>
    <div
      class="hds-dropdown__footer
        {{if @hasDivider 'hds-dropdown__footer--with-divider'}}"
      ...attributes
    >
      {{yield}}
    </div>
  </template>;

export default HdsDropdownFooter;
