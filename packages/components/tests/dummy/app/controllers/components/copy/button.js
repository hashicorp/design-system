/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

function replaceMockCopyStatus() {
  document.querySelectorAll('[mock-copy-status]').forEach((element) => {
    const status = element.attributes['mock-copy-status'].value;
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

export default class CopyButtonController extends Controller {
  @service router;
  @tracked isModalActive = false;

  constructor() {
    super(...arguments);
    this.router.on('routeDidChange', this, 'routeDidChange');
  }

  routeDidChange() {
    if (this.router.currentRoute.name === 'components.copy.button') {
      scheduleOnce('afterRender', this, replaceMockCopyStatus);
    }
  }

  get bigIntNumber() {
    let bigIntNumber = BigInt(12345678910);
    return bigIntNumber;
  }

  get targetNodeElement() {
    return document.querySelector('#test-target-node-element');
  }

  get targetMultipleNodeElements() {
    return document.querySelectorAll('#test-target-node-elements');
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
