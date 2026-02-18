/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsApplicationPaginationNavEllipsisSignature {
  Element: HTMLDivElement;
}

const HdsApplicationPaginationNavEllipsis: TemplateOnlyComponent<HdsApplicationPaginationNavEllipsisSignature> =
  <template>
    <div class="hds-pagination-nav__ellipsis" ...attributes>...</div>
  </template>;

export default HdsApplicationPaginationNavEllipsis;
