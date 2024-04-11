/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { scheduleOnce } from '@ember/runloop';

function centerScrollableArea({
  element,
  direction,
  horizontalShift,
  verticalShift,
}) {
  if (direction === 'both' || direction === 'x') {
    element.scrollLeft =
      horizontalShift + (element.scrollWidth - element.offsetWidth) / 2;
  }
  if (direction === 'both' || direction === 'y') {
    element.scrollTop =
      verticalShift + (element.scrollHeight - element.offsetHeight) / 2;
  }
}

export default class AutoscrollableIndexComponent extends Component {
  autoscroll = modifier(
    (element) => {
      scheduleOnce('afterRender', this, centerScrollableArea, {
        element: element,
        direction: this.args.direction ?? 'both',
        horizontalShift: this.args.horizontalShift ?? 0,
        verticalShift: this.args.verticalShift ?? 0,
      });
    },
    { eager: false }
  );
}
