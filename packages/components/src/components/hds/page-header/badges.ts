/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsPageHeaderBadgesSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsPageHeaderBadges =
  TemplateOnlyComponent<HdsPageHeaderBadgesSignature>();

export default HdsPageHeaderBadges;
