/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface ShwLabelSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLParagraphElement;
}

export default class ShwLabel extends Component<ShwLabelSignature> {
  <template>
    <p class="shw-label shw-text-body-small" ...attributes>
      {{yield}}
    </p>
  </template>
}
