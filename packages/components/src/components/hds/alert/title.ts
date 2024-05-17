/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsAlertTitleSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsAlertTitleComponent = TemplateOnlyComponent<HdsAlertTitleSignature>();

export default HdsAlertTitleComponent;
