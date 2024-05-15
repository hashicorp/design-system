/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsAppFrameFooterSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class HdsAppFrameFooterComponent extends Component<HdsAppFrameFooterSignature> {}
