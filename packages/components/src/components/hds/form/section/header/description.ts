/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';
import type { HdsTextBodySignature } from '../../../text/body.ts';

export interface HdsFormSectionHeaderDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsFormDescription =
  TemplateOnlyComponent<HdsFormSectionHeaderDescriptionSignature>();
export default HdsFormDescription;
