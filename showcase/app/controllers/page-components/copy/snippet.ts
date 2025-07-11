/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

import type Owner from '@ember/owner';
import type RouterService from '@ember/routing/router-service';

import type { PageComponentsCopySnippetModel } from 'showcase/routes/page-components/copy/snippet';

export default class PageComponentsCopySnippetController extends Controller {
  declare model: PageComponentsCopySnippetModel;
  @service declare router: RouterService;

  constructor(owner: Owner) {
    super(owner);
    this.router.on('routeDidChange', this.routeDidChange.bind(this));
  }

  routeDidChange() {
    if (this.router.currentRoute?.name === 'components.copy.snippet') {
      // eslint-disable-next-line ember/no-runloop
      scheduleOnce('afterRender', this, this.replaceMockCopyStatus.bind(this));
    }
  }

  replaceMockCopyStatus() {
    document.querySelectorAll('[mock-copy-status]').forEach((element) => {
      const status = element.getAttribute('mock-copy-status');
      element.classList.remove('hds-copy-button--status-idle');
      element.classList.add(`hds-copy-button--status-${status}`);

      const icon = element.querySelector('svg use');

      if (icon) {
        if (status === 'success') {
          // eg. href="#flight-clipboard-checked-16"
          icon.setAttribute('href', `#flight-${this.model.SUCCESS_ICON}-16`);
        } else if (status === 'error') {
          icon.setAttribute('href', `#flight-${this.model.ERROR_ICON}-16`);
        }
      }
    });
  }
}
