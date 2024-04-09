/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

function centerScrollableArea() {
  document.querySelectorAll('[center-scrollable-area]').forEach((element) => {
    const direction =
      element.attributes['center-scrollable-area'].value ?? 'both';
    if (direction === 'both' || direction === 'x') {
      element.scrollLeft = (element.scrollWidth - element.offsetWidth) / 2;
    }
    if (direction === 'both' || direction === 'y') {
      element.scrollTop =
        20 + (element.scrollHeight - element.offsetHeight) / 2;
    }
  });
}

export default class PopoverPrimitiveController extends Controller {
  @service router;

  constructor() {
    super(...arguments);
    this.router.on('routeDidChange', this, 'routeDidChange');
  }

  routeDidChange() {
    if (this.router.currentRoute.name === 'utilities.popover-primitive') {
      scheduleOnce('afterRender', this, centerScrollableArea);
    }
  }

  @action
  noop() {}

  @action
  onClickButton() {
    window.alert('The button has been clicked!');
  }
}
