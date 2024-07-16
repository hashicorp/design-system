/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsApplicationStateMediaSignature {
  Element: HTMLDivElement;
}

const HdsApplicationStateMediaComponent =
  TemplateOnlyComponent<HdsApplicationStateMediaSignature>();

export default HdsApplicationStateMediaComponent;
