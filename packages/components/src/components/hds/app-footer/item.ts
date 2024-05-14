/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsAppFooterItemSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

export default class HdsAlertDescriptionComponent extends Component<HdsAppFooterItemSignature> {}
