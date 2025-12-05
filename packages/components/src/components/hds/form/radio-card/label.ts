/**
 * Copyright IBM Corp. 2021, 2025
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

const HdsFormRadioCardLabel =
  templateOnlyComponent<HdsFormRadioCardLabelSignature>();

export default HdsFormRadioCardLabel;
