/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsIconSignature } from '../../icon';
import type { HdsInteractiveSignature } from '../../interactive';

export interface HdsAppSideNavListLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    icon?: HdsIconSignature['Args']['name'];
    iconColor?: string;
    text?: string;
    badge?: string;
    count?: string;
    hasSubItems?: boolean;
    isActive?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HdsInteractiveSignature['Element'];
}

const HdsAppSideNavListLinkComponent =
  TemplateOnlyComponent<HdsAppSideNavListLinkSignature>();

export default HdsAppSideNavListLinkComponent;
