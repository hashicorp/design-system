/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';

export interface ShwOutlinerSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class ShwOutliner extends Component<ShwOutlinerSignature> {
  <template>
    <div class="shw-outliner" ...attributes>
      {{yield}}
    </div>
  </template>
}
