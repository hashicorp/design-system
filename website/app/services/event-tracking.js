/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class EventService extends Service {
  @service fastboot;

  @action
  trackEvent(eventName) {
    // Only attempt to do something if we are in the right environment
    if (!this.fastboot.isFastBoot && window.fathom && eventName) {
      // https://usefathom.com/docs/features/events
      window.fathom.trackEvent(eventName);
    }
  }
}
