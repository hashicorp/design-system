/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsFormLabelSignature } from '../label/index.ts';

export interface HdsKeyValuePairLabelSignature {
  Args: HdsFormLabelSignature['Args'] & {
    hiddenText?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HdsFormLabelSignature['Element'];
}

const HdsKeyValuePairLabel =
  TemplateOnlyComponent<HdsKeyValuePairLabelSignature>();

export default HdsKeyValuePairLabel;
