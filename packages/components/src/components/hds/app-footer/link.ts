/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { HdsInteractiveSignature } from '../interactive/';
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

export default class HdsAppFooterLinkComponent extends Component<HdsAppFooterLinkSignature> {}
