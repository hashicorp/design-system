/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface ShwOutlinerSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const ShwOutliner: TemplateOnlyComponent<ShwOutlinerSignature> = <template>
  <div class="shw-outliner" ...attributes>
    {{yield}}
  </div>
</template>;

export default ShwOutliner;
