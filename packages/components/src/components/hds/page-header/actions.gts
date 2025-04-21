/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsPageHeaderActionsSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsPageHeaderActions: TOC<HdsPageHeaderActionsSignature> = <template>
  <div class="hds-page-header__actions" ...attributes>{{yield}}</div>
</template>;

export default HdsPageHeaderActions;
