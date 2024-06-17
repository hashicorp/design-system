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
<<<<<<< HEAD
    // if the tracking is disabled, do not add the event listener
    if (!this.eventTracking.isEnabled) {
      // comment this line if you want the tracking function in the `eventTracking` service to be called even if the tracking is disabled
=======
    if (!this.eventTracking.isEnabled) {
      // comment this line if you want to test in your local environment
>>>>>>> fb12260377205fed34a98ff052b6dd89950bd685
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
