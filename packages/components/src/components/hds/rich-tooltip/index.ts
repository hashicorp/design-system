/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { getElementId } from '../../../utils/hds-get-element-id.js';

export default class HdsRichTooltipIndexComponent extends Component {
  elementId = getElementId(this);
  arrowId = `arrow-${this.elementId}`;
  popoverId = `popover-${this.elementId}`;

  get enableSoftEvents() {
    return this.args.enableClickEvents !== true;
  }

  get enableClickEvents() {
    return this.args.enableClickEvents ?? false;
  }
}
