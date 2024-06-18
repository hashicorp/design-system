/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { HdsInteractiveSignature } from '../interactive/';
import type { HdsLinkColors, HdsLinkIconPositions } from '../link/types.ts';
import type { HdsLinkInlineSignature } from '../link/inline.ts';
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';

export interface HdsAppFooterLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    color?: HdsLinkColors;
    icon?: FlightIconSignature['Args']['name'];
    iconPosition?: HdsLinkIconPositions;
  };
  Blocks: {
    default: [];
  };
  Element: HdsLinkInlineSignature['Element'];
}

export default class HdsAppFooterLinkComponent extends Component<HdsAppFooterLinkSignature> {}
