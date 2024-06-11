/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';

function handleTriggerEvent(eventName) {
  // https://usefathom.com/docs/features/events
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

export default class DocTrackEvent extends Modifier {
  @service fastboot;

  element = null;
  eventName = null;
  triggerEvent = null;

  modify(element, _positional, named) {
    if (
      // Only attempt to do something if we are in the right environment
      this.fastboot.isFastBoot ||
      window.fathom == null
    ) {
      return;
    }

    const { on = 'click', eventName } = named;

    const hasValidEventName = typeof eventName === 'string';

    assert(
      `@eventName for "doc-track-event" must be a string; received: ${eventName}`,
      hasValidEventName
    );

    this.element = element;
    this.eventName = eventName;
    this.triggerEvent = on;

    element.addEventListener(this.triggerEvent, handleTriggerEvent(eventName));

    registerDestructor(this, cleanup);
  }
}
