import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { inject as service } from '@ember/service';

function handleClick(eventName) {
  window.fathom?.trackEvent(eventName);
}

function cleanup(instance) {
  instance.eventName = null;
  instance.element.removeEventListener('click', handleClick);
}

export default class DocTrackEvent extends Modifier {
  @service fastboot;

  element = null;
  eventName = null;

  modify(element, [eventName]) {
    if (!this.fastboot.isFastBoot && window.fathom && eventName) {
      this.addEventListener(element, eventName);

      registerDestructor(this, cleanup);
    }
  }

  addEventListener(element, eventName) {
    this.element = element;
    this.eventName = eventName;

    element.addEventListener('click', handleClick(eventName));
  }
}
