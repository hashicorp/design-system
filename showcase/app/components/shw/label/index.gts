/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface ShwLabelSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLParagraphElement;
}

const ShwLabel: TemplateOnlyComponent<ShwLabelSignature> = <template>
  <p class="shw-label shw-text-body-small" ...attributes>
    {{yield}}
  </p>
</template>;

export default ShwLabel;
