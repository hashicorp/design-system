/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { HdsInteractiveSignature } from '../interactive/';
import type { HdsLinkColors, HdsLinkIconPositions } from '../link/types.ts';

export interface HdsAppFooterLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    color?: HdsLinkColors;
    href?: string;
    icon?: string;
    iconPosition?: HdsLinkIconPositions;
    isHrefExternal?: boolean;
    isRouteExternal?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsAlertDescriptionComponent extends Component<HdsAppFooterLinkSignature> {}
