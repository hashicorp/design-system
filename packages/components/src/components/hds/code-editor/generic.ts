/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsCodeEditorGenericSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsCodeEditorGeneric =
  TemplateOnlyComponent<HdsCodeEditorGenericSignature>();

export default HdsCodeEditorGeneric;
