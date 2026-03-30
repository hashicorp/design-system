/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface ShwYieldSignature {
  Blocks: {
    default?: [];
  };
}

const ShwYield: TemplateOnlyComponent<ShwYieldSignature> = <template>
  <yield />
</template>;

export default ShwYield;
