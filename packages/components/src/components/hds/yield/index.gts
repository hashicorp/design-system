/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsYieldSignature {
  Blocks: {
    default: [];
  };
}

const HdsYield: TOC<HdsYieldSignature> = <template>
  {{! template-lint-disable no-yield-only }}
  {{yield}}
</template>;

export default HdsYield;
