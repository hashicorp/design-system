/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsPageHeaderBadgesSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsPageHeaderBadges: TOC<HdsPageHeaderBadgesSignature> = <template>
  <div class="hds-page-header__badges-wrapper" ...attributes>{{yield}}</div>
</template>;

export default HdsPageHeaderBadges;
