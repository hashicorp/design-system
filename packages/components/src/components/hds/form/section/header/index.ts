/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsFormSectionHeaderSignature {
  Blocks: { default: [] };
  Element: HTMLDivElement;
}
const HdsFormSectionHeader =
  TemplateOnlyComponent<HdsFormSectionHeaderSignature>();

export default HdsFormSectionHeader;
