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

export default class CodeBlockController extends Controller {
  @service router;
  @tracked isModalActive = false;
  @tracked declaration = 'let';
  @tracked input = '';

  constructor() {
    super(...arguments);
    this.router.on('routeDidChange', this, 'routeDidChange');
  }

  routeDidChange() {
    if (this.router.currentRoute.name === 'components.code-block') {
      scheduleOnce('afterRender', this, replaceMockCopyStatus);
    }
  }

  get textWithNewline() {
    return "let codeLang='JavaScript';\nconsole.log(`I am ${codeLang} code`);";
  }

  get codeValue() {
    let value = `${this.declaration} codeLang='JavaScript';`;
    if (this.input !== '') {
      value += `\n\nvar ${this.input} = "the input is: ${this.input}"`;
    }
    return value;
  }

  @action
  updateCodeValue() {
    this.declaration = ['var', 'const', 'let'][Math.floor(Math.random() * 3)];
    this.input = ['rand1', 'rand2', 'rand3', ''][Math.floor(Math.random() * 4)];
  }

  @action
  updateInput(event) {
    this.input = event.target.value;
  }

  @action
  activateModal() {
    this.isModalActive = true;
  }

  @action
  deactivateModal() {
    this.isModalActive = false;
  }
}
