/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import type { PositionalArgs } from 'ember-modifier';
import { service } from '@ember/service';
import { assert } from '@ember/debug';

import EventTrackingService from 'website/services/event-tracking';

export interface DocTrackEventModifierSignature {
  Args: {
    Named: {
      triggerEvent?: string;
      eventName: string;
    };
  };
  Element: HTMLElement;
}

export default class DocTrackEvent extends Modifier<DocTrackEventModifierSignature> {
  @service declare readonly eventTracking: EventTrackingService;

  modify(
    element: DocTrackEventModifierSignature['Element'],
    _positional: PositionalArgs<DocTrackEventModifierSignature>,
    named: DocTrackEventModifierSignature['Args']['Named'],
  ) {
    // if the tracking is disabled, do not add the event listener
    if (!this.eventTracking.isEnabled) {
      // comment this line if you want the tracking function in the `eventTracking` service to be called even if the tracking is disabled
      return;
    }

    const { triggerEvent = 'click', eventName } = named;

    assert(
      `@eventName for "doc-track-event" must be a string; received: ${eventName}`,
      typeof eventName === 'string',
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
