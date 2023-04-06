/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsTooltipIndexComponent extends Component {
  get text() {
    return this.args.text;
  }

  get options() {
    return {
      // parse `content` strings as HTML
      allowHTML: true,
      // takes string
      placement: this.args.placement,
      // takes array of 2 numbers (skidding, distance): array(0, 0)
      offset: this.args.offset,
    };
  }
}
