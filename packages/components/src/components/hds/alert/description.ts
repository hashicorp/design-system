/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsAlertDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAlertDescriptionComponent extends Component<HdsAlertDescriptionSignature> {}
