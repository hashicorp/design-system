/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsButtonSignature } from '../button';

export interface HdsKeyValuePairDeleteRowButtonSignature {
  Args: {
    onClick: (index: number) => void;
    text: HdsButtonSignature['Args']['text'];
    index: number;
  };
  Element: HdsButtonSignature['Element'];
}

const HdsKeyValuePairDeleteRowButton =
  TemplateOnlyComponent<HdsKeyValuePairDeleteRowButtonSignature>();

export default HdsKeyValuePairDeleteRowButton;
