/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

interface HdsButtonSetSignature {
  Blocks: { default: [] };
  Element: HTMLDivElement;
}

export default class HdsButtonSetComponent extends Component<HdsButtonSetSignature> {}
