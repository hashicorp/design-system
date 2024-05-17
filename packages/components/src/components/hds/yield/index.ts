/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsYieldSignature {
  Blocks: {
    default: [];
  };
}

const HdsYieldComponent = TemplateOnlyComponent<HdsYieldSignature>();

export default HdsYieldComponent;
