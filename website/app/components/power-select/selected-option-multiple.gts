/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import type { PowerSelectSelectedItemSignature } from 'ember-power-select/types';

// the full option shape is needed, because ember-power-select checks it against the options' type
interface ClusterSizeOption {
  size: string;
  description: string;
  price: string;
}

// This is not an HDS component, but a supporting file for the SuperSelect docs, which pass it as `@selectedItemComponent`
const PowerSelectSelectedOptionMultiple: TemplateOnlyComponent<
  PowerSelectSelectedItemSignature<ClusterSizeOption, unknown, true>
> = <template>
  <span>
    {{@selected.size}}
  </span>
</template>;

export default PowerSelectSelectedOptionMultiple;
