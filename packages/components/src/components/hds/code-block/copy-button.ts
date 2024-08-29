/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';
import type { HdsCopyButtonSignature } from '../copy/button';

export interface HdsCodeBlockCopyButtonSignature {
  Args: {
    targetToCopy?: HdsCopyButtonSignature['Args']['targetToCopy'];
  };
  Blocks: {
    default: [];
  };
  Element: HdsCopyButtonSignature['Element'];
}

const HdsCodeBlockCopyButton =
  templateOnlyComponent<HdsCodeBlockCopyButtonSignature>();

export default HdsCodeBlockCopyButton;
