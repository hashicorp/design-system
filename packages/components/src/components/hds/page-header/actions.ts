/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsPageHeaderActionsSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsPageHeaderActions =
  TemplateOnlyComponent<HdsPageHeaderActionsSignature>();

export default HdsPageHeaderActions;
