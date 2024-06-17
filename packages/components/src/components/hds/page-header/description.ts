/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';
import type { HdsTextBodySignature } from '../text/body';

export interface HdsPageHeaderDescriptionSignature {
  Args: HdsTextBodySignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsPageHeaderDescriptionComponent =
  TemplateOnlyComponent<HdsPageHeaderDescriptionSignature>();

export default HdsPageHeaderDescriptionComponent;
