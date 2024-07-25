/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

import type { HdsTextBodySignature } from '../../text/body';

export interface HdsFormErrorMessageSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsFormErrorMessageComponent =
  templateOnlyComponent<HdsFormErrorMessageSignature>();

export default HdsFormErrorMessageComponent;
