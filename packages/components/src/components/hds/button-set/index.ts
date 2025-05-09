/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';
export interface HdsButtonSetSignature {
  Blocks: { default: [] };
  Element: HTMLDivElement;
}
const HdsButtonSet = TemplateOnlyComponent<HdsButtonSetSignature>();

export default HdsButtonSet;
