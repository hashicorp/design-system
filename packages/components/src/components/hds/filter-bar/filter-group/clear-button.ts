/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsButtonSignature } from '../../button/index.gts';

export interface HdsFilterBarFilterGroupClearButtonSignature {
  Args: {
    text: string;
  };
  Blocks: {
    default: [];
  };
  Element: HdsButtonSignature['Element'];
}

const HdsFilterBarFilterGroupClearButton =
  TemplateOnlyComponent<HdsFilterBarFilterGroupClearButtonSignature>();

export default HdsFilterBarFilterGroupClearButton;
