/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsInteractiveSignature } from '../../interactive/index.gts';

export interface HdsSideNavListBackLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    text: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

const HdsSideNavListBackLink =
  TemplateOnlyComponent<HdsSideNavListBackLinkSignature>();

export default HdsSideNavListBackLink;
