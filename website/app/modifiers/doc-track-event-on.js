import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { inject as service } from '@ember/service';

function handleTriggerEvent(eventName) {
  window.fathom?.trackEvent(eventName);
}

function cleanup(instance) {
  instance.element.removeEventListener(
    instance.triggerEvent,
    handleTriggerEvent
  );

  instance.element = null;
  instance.eventName = null;
  instance.triggerEvent = null;
}

export default class DocTrackEventOn extends Modifier {
  @service fastboot;

  element = null;
  eventName = null;
  triggerEvent = null;

  modify(element, [triggerEvent, eventName]) {
    if (
      !this.fastboot.isFastBoot &&
      window.fathom != null &&
      eventName != null &&
      triggerEvent != null
    ) {
      this.addEventListener(element, triggerEvent, eventName);

      registerDestructor(this, cleanup);
    }
  }

  addEventListener(element, triggerEvent, eventName) {
    this.element = element;
    this.eventName = eventName;
    this.triggerEvent = triggerEvent;

    element.addEventListener(triggerEvent, handleTriggerEvent(eventName));
  }
}
