/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsInteractiveSignature } from '../../interactive/';

export interface HdsSideNavListBackLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    text: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

const HdsSideNavListBackLinkComponent =
  TemplateOnlyComponent<HdsSideNavListBackLinkSignature>();

export default HdsSideNavListBackLinkComponent;
