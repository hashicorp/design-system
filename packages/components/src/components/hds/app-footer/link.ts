/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { HdsInteractiveSignature } from '../interactive/';
import type { HdsLinkColors, HdsLinkIconPositions } from '../link/types.ts';
import type { HdsAppFooterItemSignature } from './item.ts';

export interface HdsAppFooterLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    color?: HdsLinkColors;
    icon?: string;
    iconPosition?: HdsLinkIconPositions;
  };
  Blocks: {
    default: [];
  };
  Element: HdsAppFooterItemSignature['Element'];
}

export default class HdsAppFooterLinkComponent extends Component<HdsAppFooterLinkSignature> {}
