/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';
import type { HdsTextDisplaySignature } from '../../text/display';

export interface HdsFormRadioCardLabelSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextDisplaySignature['Element'];
}

const HdsFormRadioCardLabelComponent =
  templateOnlyComponent<HdsFormRadioCardLabelSignature>();

export default HdsFormRadioCardLabelComponent;
