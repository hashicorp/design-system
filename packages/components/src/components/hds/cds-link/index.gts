/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import CDSLink from '@carbon/web-components/es/components/link/link.js';

import { createComponent } from '../../../utils/create-component.gts';

type LinkSize = 'md' | 'sm' | 'lg';

export const CDS_LINK_SIZE_OPTIONS: LinkSize[] = ['md', 'sm', 'lg'];

export default createComponent({
  tagName: 'cds-link',
  elementClass: CDSLink,
  displayName: 'HdsCdsLink',
});
