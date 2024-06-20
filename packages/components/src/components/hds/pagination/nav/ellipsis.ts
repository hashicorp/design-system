/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsPaginationNavEllipsisSignature {
  Element: HTMLDivElement;
}

const HdsPaginationNavEllipsisComponent =
  TemplateOnlyComponent<HdsPaginationNavEllipsisSignature>();

export default HdsPaginationNavEllipsisComponent;
