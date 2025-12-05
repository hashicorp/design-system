/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsAppSideNavListItemSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

const HdsAppSideNavListItem =
  TemplateOnlyComponent<HdsAppSideNavListItemSignature>();

export default HdsAppSideNavListItem;
