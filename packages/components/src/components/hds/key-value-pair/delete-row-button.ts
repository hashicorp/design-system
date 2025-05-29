/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsButtonSignature } from '../button';

export interface HdsKeyValuePairDeleteRowButtonSignature {
  Args: {
    onAddRowClick?: () => void;
    label?: string;
  };
  Element: HdsButtonSignature['Element'];
}

const HdsKeyValuePairDeleteRowButton =
  TemplateOnlyComponent<HdsKeyValuePairDeleteRowButtonSignature>();

export default HdsKeyValuePairDeleteRowButton;
