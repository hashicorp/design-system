/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import CDSAccordion from '@carbon/web-components/es/components/accordion/accordion.js';

import {
  ACCORDION_SIZE,
  ACCORDION_ALIGNMENT,
} from '@carbon/web-components/es/components/accordion/defs.js';

export const CDS_ACCORDION_SIZE_OPTIONS = Object.values(ACCORDION_SIZE);
export const CDS_ACCORDION_ALIGNMENT_OPTIONS =
  Object.values(ACCORDION_ALIGNMENT);

import { createComponent } from '../../../utils/create-component.gts';

export default createComponent({
  tagName: 'cds-accordion',
  elementClass: CDSAccordion,
  displayName: 'HdsCdsAccordion',
});
