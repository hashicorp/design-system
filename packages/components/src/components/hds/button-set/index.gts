/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsButtonSetSignature {
  Blocks: { default: [] };
  Element: HTMLDivElement;
}
const HdsButtonSet: TOC<HdsButtonSetSignature> = <template>
  <div class="hds-button-set" ...attributes>
    {{yield}}
  </div>
</template>;

export default HdsButtonSet;
