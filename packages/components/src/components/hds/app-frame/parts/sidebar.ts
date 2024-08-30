/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsAppFrameSidebarSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class HdsAppFrameSidebar extends Component<HdsAppFrameSidebarSignature> {}
