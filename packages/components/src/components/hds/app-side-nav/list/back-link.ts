/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsInteractiveSignature } from '../../interactive';

export interface HdsAppSideNavListBackLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    text: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

const HdsAppSideNavListBackLink =
  TemplateOnlyComponent<HdsAppSideNavListBackLinkSignature>();

export default HdsAppSideNavListBackLink;
