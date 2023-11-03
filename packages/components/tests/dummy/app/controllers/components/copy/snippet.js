/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

function replaceMockCopyStatus() {
  document.querySelectorAll('[mock-copy-status]').forEach((element) => {
    const status = element.attributes['mock-copy-status'].value;
    element.classList.remove('hds-copy-snippet--status-idle');
    element.classList.add(`hds-copy-snippet--status-${status}`);
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

export default class CopySnippetController extends Controller {
  @service router;

  constructor() {
    super(...arguments);
    this.router.on('routeDidChange', this, 'routeDidChange');
  }

  routeDidChange() {
    if (this.router.currentRoute.name === 'components.copy.snippet') {
      scheduleOnce('afterRender', this, replaceMockCopyStatus);
    }
  }
}
