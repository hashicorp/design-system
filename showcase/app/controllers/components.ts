/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

function replaceMockStates() {
  document.querySelectorAll('[mock-state-value]').forEach((element) => {
    let targets;
    if (element.attributes['mock-state-selector']) {
      targets = element.querySelectorAll(
        element.attributes['mock-state-selector'].value
      );
    } else {
      targets = [element];
    }
    const states = element.attributes['mock-state-value'].value.split('+');
    const classes = states.map((state) => `mock-${state.trim()}`);
    targets.forEach((target) => {
      target.classList.add(...classes);
    });
  });
}
export default class ComponentsController extends Controller {
  @service router;

  constructor() {
    super(...arguments);
    this.router.on('routeDidChange', this, 'routeDidChange');
  }

  routeDidChange() {
    scheduleOnce('afterRender', this, replaceMockStates);
  }

  willDestroy() {
    this.router.off('routeDidChange', this, 'routeDidChange');
  }
}
