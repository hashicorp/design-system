/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsAlertTitleSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAlertTitleComponent extends Component<HdsAlertTitleSignature> {}
