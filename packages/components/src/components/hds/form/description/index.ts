/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsFormDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element:
    | HTMLDivElement
    | HTMLSpanElement
    | HTMLHeadingElement
    | HTMLParagraphElement;
}

const HdsFormDescription = TemplateOnlyComponent<HdsFormDescriptionSignature>();
export default HdsFormDescription;
