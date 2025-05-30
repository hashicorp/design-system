/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsButtonSignature } from '../button';

export interface HdsKeyValuePairAddRowButtonSignature {
  Args: {
    onAddRowClick?: () => void;
    text: HdsButtonSignature['Args']['text'];
  };
  Element: HdsButtonSignature['Element'];
}

const HdsKeyValuePairAddRowButton =
  TemplateOnlyComponent<HdsKeyValuePairAddRowButtonSignature>();

export default HdsKeyValuePairAddRowButton;
