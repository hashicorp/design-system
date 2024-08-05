/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';
import type { HdsTextBodySignature } from '../text/body';

export interface HdsCodeBlockTitleSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsCodeBlockTitleComponent =
  templateOnlyComponent<HdsCodeBlockTitleSignature>();

export default HdsCodeBlockTitleComponent;
