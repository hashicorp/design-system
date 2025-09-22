/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

import type RouterService from '@ember/routing/router-service';
import type Owner from '@ember/owner';

export default class PageComponentsController extends Controller {
  @service declare readonly router: RouterService;

  constructor(owner: Owner) {
    super(owner);
    this.router.on('routeDidChange', this.routeDidChange.bind(this));
  }

  routeDidChange() {
    // eslint-disable-next-line ember/no-runloop
    scheduleOnce('afterRender', this, this.replaceMockStates.bind(this));
  }

  replaceMockStates() {
    document.querySelectorAll('[mock-state-value]').forEach((element) => {
      let targets;
      if (element.getAttribute('mock-state-selector')) {
        const elementSelector = element.getAttribute('mock-state-selector');
        if (elementSelector) {
          targets = element.querySelectorAll(elementSelector);
        }
      } else {
        targets = [element];
      }
      const states = element.getAttribute('mock-state-value')?.split('+');
      const classes = states?.map((state) => `mock-${state.trim()}`);
      targets?.forEach((target) => {
        target.classList.add(...(classes ? classes : []));
      });
    });
  }
}
