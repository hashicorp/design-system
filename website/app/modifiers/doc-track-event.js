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

  modify(element, _positional, named) {
    // if the tracking is disabled, do not add the event listener
    if (!this.eventTracking.isEnabled) {
      // comment this line if you want the tracking function in the `eventTracking` service to be called even if the tracking is disabled
      return;
    }

    const { triggerEvent = 'click', eventName } = named;

    assert(
      `@eventName for "doc-track-event" must be a string; received: ${eventName}`,
      typeof eventName === 'string'
    );

    const handleTriggerEvent = () => {
      this.eventTracking.trackEvent(eventName);
    };

    element.addEventListener(triggerEvent, handleTriggerEvent);

    registerDestructor(this, () => {
      element.removeEventListener(triggerEvent, handleTriggerEvent);
    });
  }
}
