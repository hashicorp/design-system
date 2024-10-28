/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsAppFrameStickyFooterSignature {
  Args: {
    isPortal?: boolean;
    targetName?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsAppFrameStickyFooter =
  TemplateOnlyComponent<HdsAppFrameStickyFooterSignature>();

export default HdsAppFrameStickyFooter;
