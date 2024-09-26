/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { concat } from '@ember/helper';

export interface ShwDividerSignature {
  Args: {
    level?: 2;
  };
  Element: HTMLHRElement;
}

export default class ShwDivider extends Component<ShwDividerSignature> {
  <template>
    <hr
      class="shw-divider {{if @level (concat 'shw-divider--level-' @level)}}"
    />
  </template>
}
