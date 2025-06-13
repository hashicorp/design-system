/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';
import type { HdsTextBodySignature } from '../../text/body.ts';

export interface HdsFormHeaderDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsFormHeaderDescription =
  TemplateOnlyComponent<HdsFormHeaderDescriptionSignature>();
export default HdsFormHeaderDescription;
