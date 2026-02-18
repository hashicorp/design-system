/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsPageHeaderBadgesSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsPageHeaderBadges: TemplateOnlyComponent<HdsPageHeaderBadgesSignature> =
  <template>
    <div class="hds-page-header__badges-wrapper" ...attributes>{{yield}}</div>
  </template>;

export default HdsPageHeaderBadges;
