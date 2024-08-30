/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsAlertDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsAlertDescription =
  TemplateOnlyComponent<HdsAlertDescriptionSignature>();

export default HdsAlertDescription;
