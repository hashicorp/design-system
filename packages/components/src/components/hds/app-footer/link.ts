/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsInteractiveSignature } from '../interactive.ts';
import type { HdsLinkColors, HdsLinkIconPositions } from '../link/types.ts';
import type { HdsLinkInlineSignature } from '../link/inline.ts';
import type { HdsIconSignature } from '../icon';

export interface HdsAppFooterLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    color?: HdsLinkColors;
    icon?: HdsIconSignature['Args']['name'];
    iconPosition?: HdsLinkIconPositions;
  };
  Blocks: {
    default: [];
  };
  Element: HdsLinkInlineSignature['Element'];
}

const HdsAppFooterLink = TemplateOnlyComponent<HdsAppFooterLinkSignature>();

export default HdsAppFooterLink;
