import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class FathomEventService extends Service {
  @service fastboot;

  @action
  fathomEvent(eventName) {
    // Only attempt to do something if we are in the right environment
    if (!this.fastboot.isFastBoot && window.fathom && eventName) {
      // https://usefathom.com/docs/features/events
      window.fathom.trackEvent(eventName);
    }
  }
}
