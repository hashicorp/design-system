/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsPageHeaderActionsSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsPageHeaderActions: TemplateOnlyComponent<HdsPageHeaderActionsSignature> =
  <template>
    <div class="hds-page-header__actions" ...attributes>{{yield}}</div>
  </template>;

export default HdsPageHeaderActions;
