/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';
import type { HdsTextBodySignature } from '../../text/body';

export interface HdsFormRadioCardDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsFormRadioCardDescriptionComponent =
  templateOnlyComponent<HdsFormRadioCardDescriptionSignature>();

export default HdsFormRadioCardDescriptionComponent;
