/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';

export default class DocTrackEvent extends Modifier {
  @service fastboot;

  modify(element, _positional, named) {
    if (
      // Only attempt to do something if we are in the right environment
      this.fastboot.isFastBoot ||
      window.fathom == null
    ) {
      // comment this line if you want to test in your local environment
      return;
    }

    const { triggerEvent = 'click', eventName } = named;

    assert(
      `@eventName for "doc-track-event" must be a string; received: ${eventName}`,
      typeof eventName === 'string'
    );

    const handleTriggerEvent = () => {
      // https://usefathom.com/docs/features/events
      window.fathom?.trackEvent(eventName);
    };

    element.addEventListener(triggerEvent, handleTriggerEvent);

    registerDestructor(this, () => {
      element.removeEventListener(triggerEvent, handleTriggerEvent);
    });
  }
}
