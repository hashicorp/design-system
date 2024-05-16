/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import RouterService from '@ember/routing/router-service';
import type Owner from '@ember/owner';

function replaceMockStates() {
  document.querySelectorAll('[mock-state-value]').forEach((element) => {
    let targets;
    let mockStateSelector = element.attributes.getNamedItem(
      'mock-state-selector'
    );
    if (mockStateSelector) {
      targets = element.querySelectorAll(mockStateSelector.value);
    } else {
      targets = [element];
    }
    const states =
      element.attributes.getNamedItem('mock-state-value')?.value.split('+') ||
      [];
    const classes = states.map((state) => `mock-${state.trim()}`);
    targets.forEach((target) => {
      target.classList.add(...classes);
    });
  });
}
export default class ComponentsController extends Controller {
  @service declare readonly router: RouterService;

  constructor(owner: Owner | undefined) {
    super(owner);
    this.router.on('routeDidChange', this.routeDidChange);
  }

  routeDidChange() {
    scheduleOnce('afterRender', replaceMockStates);
  }

  willDestroy() {
    this.router.off('routeDidChange', this.routeDidChange);
  }
}
