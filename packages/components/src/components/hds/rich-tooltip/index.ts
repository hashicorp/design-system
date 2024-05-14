/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { getElementId } from '../../../utils/hds-get-element-id';
import type { HdsPopoverPrimitiveSignature } from '../popover-primitive';

interface HdsRichTooltipSignature {
  Args: Omit<HdsPopoverPrimitiveSignature['Args'], 'enableSoftEvents'>;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsRichTooltipComponent extends Component<HdsRichTooltipSignature> {
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
