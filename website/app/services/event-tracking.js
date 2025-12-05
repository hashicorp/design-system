/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Service from '@ember/service';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class EventService extends Service {
  @service fastboot;

  // Only attempt to do something if we are in the right environment
  isEnabled = !this.fastboot.isFastBoot && window.fathom;

  @action
  trackEvent(eventName) {
    if (this.isEnabled && eventName != null) {
      // https://usefathom.com/docs/features/events
      window.fathom.trackEvent(eventName);
    }
  }
}
