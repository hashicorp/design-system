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

export default class PageComponentsCodeBlockController extends Controller {
  @service router;
  @tracked isModalActive = false;
  @tracked declaration = 'let';
  @tracked input = '';
  @tracked value_demo1 = this.value_start_demo1;

  value_start_demo1 = `package main
import 'fmt'
func main() {
  res = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
  fm.Println(res)
}`;

  value_new_demo1 = `package main
import 'fmt'
func main() {
  res = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
  fm.Println(res)
}
func main2() {
  res = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
  fm.Println(res)
}`;

  constructor() {
    super(...arguments);
    this.router.on('routeDidChange', this, 'routeDidChange');
  }

  routeDidChange() {
    if (this.router.currentRoute.name === 'page-components.code-block') {
      // eslint-disable-next-line ember/no-runloop
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

  @action
  onUpdateClickDemo1() {
    if (this.value_demo1 === this.value_start_demo1) {
      this.value_demo1 = this.value_new_demo1;
    } else {
      this.value_demo1 = this.value_start_demo1;
    }
  }
}
