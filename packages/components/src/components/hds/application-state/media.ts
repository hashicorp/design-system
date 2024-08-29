/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsApplicationStateMediaSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsApplicationStateMedia =
  TemplateOnlyComponent<HdsApplicationStateMediaSignature>();

export default HdsApplicationStateMedia;
