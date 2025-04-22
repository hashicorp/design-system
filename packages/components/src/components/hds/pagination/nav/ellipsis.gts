/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TOC } from '@ember/component/template-only';

export interface HdsApplicationPaginationNavEllipsisSignature {
  Element: HTMLDivElement;
}

const HdsApplicationPaginationNavEllipsis: TOC<HdsApplicationPaginationNavEllipsisSignature> =
  <template>
    <div class="hds-pagination-nav__ellipsis" ...attributes>...</div>
  </template>;

export default HdsApplicationPaginationNavEllipsis;
