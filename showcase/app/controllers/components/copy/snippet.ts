/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

import type Owner from '@ember/owner';
import type { Registry as Services } from '@ember/service';

import type { ComponentsCopySnippetModel } from 'showcase/routes/components/copy/snippet';

export default class CopySnippetController extends Controller {
  declare model: ComponentsCopySnippetModel;
  @service router!: Services['router'];

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
