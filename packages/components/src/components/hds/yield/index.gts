/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsYieldSignature {
  Blocks: {
    default: [];
  };
}

const HdsYield: TemplateOnlyComponent<HdsYieldSignature> = <template>
  {{! template-lint-disable no-yield-only }}
  {{yield}}
</template>;

export default HdsYield;
