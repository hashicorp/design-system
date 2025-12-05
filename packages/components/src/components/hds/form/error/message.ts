/**
 * Copyright IBM Corp. 2021, 2025
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

const HdsFormErrorMessage =
  templateOnlyComponent<HdsFormErrorMessageSignature>();

export default HdsFormErrorMessage;
