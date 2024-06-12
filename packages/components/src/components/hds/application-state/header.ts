/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsApplicationStateHeaderSignature {
  Args: {
    title?: string;
    errorCode?: string;
    icon?: string;
  };
  Element: HTMLDivElement;
}

const HdsApplicationStateHeaderComponent =
  TemplateOnlyComponent<HdsApplicationStateHeaderSignature>();

export default HdsApplicationStateHeaderComponent;
