/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsDropdownHeaderSignature {
  Args: {
    hasDivider?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsDropdownHeader: TOC<HdsDropdownHeaderSignature> = <template>
  <div
    class="hds-dropdown__header
      {{if @hasDivider 'hds-dropdown__header--with-divider'}}"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

export default HdsDropdownHeader;
