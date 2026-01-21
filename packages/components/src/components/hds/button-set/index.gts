/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
export interface HdsButtonSetSignature {
  Blocks: { default: [] };
  Element: HTMLDivElement;
}
const HdsButtonSet: TemplateOnlyComponent<HdsButtonSetSignature> = <template>
  <div class="hds-button-set" ...attributes>
    {{yield}}
  </div>
</template>;

export default HdsButtonSet;
