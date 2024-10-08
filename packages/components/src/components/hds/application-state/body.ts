/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsApplicationStateBodySignature {
  Args: {
    text?: string;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

const HdsApplicationStateBody =
  TemplateOnlyComponent<HdsApplicationStateBodySignature>();

export default HdsApplicationStateBody;
