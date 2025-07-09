/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

import type Owner from '@ember/owner';
import type { Registry as Services } from '@ember/service';

import type { ComponentsCopyButtonModel } from 'showcase/routes/components/copy/button';

export default class CopyButtonController extends Controller {
  declare model: ComponentsCopyButtonModel;
  @service router!: Services['router'];
  @tracked isModalActive = false;

  constructor(owner: Owner) {
    super(owner);
    this.router.on('routeDidChange', this.routeDidChange.bind(this));
  }

  routeDidChange() {
    if (this.router.currentRoute?.name === 'components.copy.button') {
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

  get bigIntNumber() {
    const bigIntNumber = BigInt(12345678910);
    return bigIntNumber;
  }

  get targetNodeElement() {
    const element = document.querySelector('#test-target-node-element');
    if (!element) {
      return undefined;
    }

    return element as HTMLElement;
  }

  @action
  activateModal() {
    this.isModalActive = true;
  }

  @action
  deactivateModal() {
    this.isModalActive = false;
  }

  // DEBUG
  // uncomment these if you need to debug the `onSuccess/onError` callback methods

  // @action
  // onSuccess({ trigger, text, target }) {
  //   console.log('onSuccess invoked in the controller', trigger, text, target);
  // }

  // @action
  // onError({ trigger, text, target }) {
  //   console.log('onError invoked in the controller', trigger, text, target);
  // }
}
