/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import CDSTextInput from '@carbon/web-components/es/components/text-input/text-input.js';

import {
  INPUT_SIZE,
  INPUT_TOOLTIP_ALIGNMENT,
  INPUT_TOOLTIP_DIRECTION,
  INPUT_TYPE,
} from '@carbon/web-components/es/components/text-input/defs.js';

import { createComponent } from '../../../utils/create-component.gts';

export const CDS_TEXT_INPUT_SIZE_OPTIONS = Object.values(INPUT_SIZE);
export const CDS_TEXT_INPUT_TOOLTIP_ALIGNMENT_OPTIONS = Object.values(
  INPUT_TOOLTIP_ALIGNMENT
);
export const CDS_TEXT_INPUT_TOOLTIP_DIRECTION_OPTIONS = Object.values(
  INPUT_TOOLTIP_DIRECTION
);
export const CDS_TEXT_INPUT_TYPE_OPTIONS = Object.values(INPUT_TYPE);

export default createComponent({
  tagName: 'cds-text-input',
  elementClass: CDSTextInput,
  displayName: 'HdsCdsTextInput',
});
