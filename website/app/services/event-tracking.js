/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class EventService extends Service {
  @service fastboot;

  isEnabled = false;

  constructor() {
    super(...arguments);

    // Only attempt to do something if we are in the right environment
    this.isEnabled = !this.fastboot.isFastBoot && window.fathom;
  }

  @action
  trackEvent(eventName) {
    if (!this.isEnabled) {
      // comment this line if you want to test in your local environment
      return;
    }

    window.fathom.trackEvent(eventName);
  }
}
