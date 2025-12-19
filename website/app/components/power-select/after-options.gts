/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

// This is not an HDS component, but a supporting file for overrides/power-select.hbs which requires a component to be passed in for the showcase
const PowerSelectAfterOptions: TemplateOnlyComponent = <template>
  <div class="hds-power-select__after-options">
    5 results
  </div>
</template>;

export default PowerSelectAfterOptions;
