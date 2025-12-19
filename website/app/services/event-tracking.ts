/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Service from '@ember/service';
import { service } from '@ember/service';
import FastbootService from 'ember-cli-fastboot/services/fastboot';

interface Fathom {
  trackEvent: (eventName: string) => void;
}

declare global {
  interface Window {
    fathom?: Fathom;
  }
}

export default class EventService extends Service {
  @service declare fastboot: FastbootService;

  get isEnabled() {
    // Only attempt to do something if we are in the right environment
    return !this.fastboot.isFastBoot && window.fathom;
  }

  trackEvent = (eventName: string) => {
    if (this.isEnabled && eventName != null) {
      // https://usefathom.com/docs/features/events
      window.fathom?.trackEvent(eventName);
    }
  };
}
