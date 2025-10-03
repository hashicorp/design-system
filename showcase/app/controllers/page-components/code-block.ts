/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import type Owner from '@ember/owner';
import type RouterService from '@ember/routing/router-service';

import type { PageComponentsCodeBlockModel } from 'showcase/routes/page-components/code-block';

const VALUE_DEMO1_SHORTER = `package main
import 'fmt'
func main() {
  res = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
  fm.Println(res)
}`;

const VALUE_DEMO1_LONGER = `package main
import 'fmt'
func main() {
  res = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
  fm.Println(res)
}
func main2() {
  res = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
  fm.Println(res)
}`;

export default class PageComponentsCodeBlockController extends Controller {
  declare model: PageComponentsCodeBlockModel;

  @service declare router: RouterService;
  @tracked isModalActive = false;
  @tracked input: string | undefined = '';
  @tracked value_demo1 = VALUE_DEMO1_SHORTER;

  constructor(owner: Owner) {
    super(owner);
    this.router.on('routeDidChange', this.routeDidChange.bind(this));
  }

  routeDidChange() {
    if (this.router.currentRoute?.name === 'page-components.code-block') {
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

  get textWithNewline() {
    return `Vagrant.configure("2") do |config|\nconfig.vm.box "ubuntu/noble64"\nend`;
  }

  get codeValue() {
    let value = `codeLang = 'ruby';`;
    if (this.input !== '') {
      value += `\n\n${this.input} = "the input is: ${this.input}"`;
    }
    return value;
  }

  @action
  updateCodeValue() {
    this.input = ['rand1', 'rand2', 'rand3', ''][Math.floor(Math.random() * 4)];
  }

  @action
  updateInput(event: Event) {
    this.input = (event.target as HTMLInputElement).value;
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
    if (this.value_demo1 === VALUE_DEMO1_SHORTER) {
      this.value_demo1 = VALUE_DEMO1_LONGER;
    } else {
      this.value_demo1 = VALUE_DEMO1_SHORTER;
    }
  }
}
