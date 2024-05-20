/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';
interface HdsButtonSetSignature {
  Blocks: { default: [] };
  Element: HTMLDivElement;
}
const HdsButtonSetComponent = TemplateOnlyComponent<HdsButtonSetSignature>();

export default HdsButtonSetComponent;
