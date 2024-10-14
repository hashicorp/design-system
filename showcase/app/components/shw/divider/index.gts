/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { concat } from '@ember/helper';

export interface ShwDividerSignature {
  Args: {
    level?: 2;
  };
  Element: HTMLHRElement;
}

const ShwDivider: TemplateOnlyComponent<ShwDividerSignature> = <template>
  <hr class="shw-divider {{if @level (concat 'shw-divider--level-' @level)}}" />
</template>;

export default ShwDivider;
