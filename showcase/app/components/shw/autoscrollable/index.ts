/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { scheduleOnce } from '@ember/runloop';

import { AutoscrollableDirectionValues } from './types';
import type { AutoscrollableDirections } from './types';

function centerScrollableArea({
  element,
  direction,
  horizontalShift,
  verticalShift,
}: {
  element: HTMLElement;
  direction: AutoscrollableDirections;
  horizontalShift: number;
  verticalShift: number;
}) {
  if (
    direction === AutoscrollableDirectionValues.Both ||
    direction === AutoscrollableDirectionValues.X
  ) {
    element.scrollLeft =
      horizontalShift + (element.scrollWidth - element.offsetWidth) / 2;
  }
  if (
    direction === AutoscrollableDirectionValues.Both ||
    direction === AutoscrollableDirectionValues.Y
  ) {
    element.scrollTop =
      verticalShift + (element.scrollHeight - element.offsetHeight) / 2;
  }
}

interface ShwAutoscrollableSignature {
  Args: {
    direction?: AutoscrollableDirections;
    horizontalShift?: number;
    verticalShift?: number;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class ShwAutoscrollable extends Component<ShwAutoscrollableSignature> {
  autoscroll = modifier((element: HTMLElement) => {
    scheduleOnce('afterRender', this, centerScrollableArea, {
      element: element,
      direction: this.args.direction ?? 'both',
      horizontalShift: this.args.horizontalShift ?? 0,
      verticalShift: this.args.verticalShift ?? 0,
    });
  });
}
