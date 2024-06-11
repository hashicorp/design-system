/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';

export default class DocTrackEvent extends Modifier {
  @service eventTracking;

  element = null;
  eventName = null;
  triggerEvent = null;

  handleTriggerEvent() {
    this.eventTracking.trackEvent(this.eventName);
  }

  cleanup() {
    this.element.removeEventListener(
      this.triggerEvent,
      this.handleTriggerEvent
    );

    this.element = null;
    this.eventName = null;
    this.triggerEvent = null;
  }

  modify(element, _positional, named) {
    if (!this.eventTracking.isEnabled) {
      return;
    }

    const { triggerEvent = 'click', eventName } = named;

    const hasValidEventName = typeof eventName === 'string';

    assert(
      `@eventName for "doc-track-event" must be a string; received: ${eventName}`,
      hasValidEventName
    );

    this.element = element;
    this.eventName = eventName;
    this.triggerEvent = triggerEvent;

    element.addEventListener(
      this.triggerEvent,
      this.handleTriggerEvent(eventName)
    );

    registerDestructor(this, this.cleanup);
  }
}
