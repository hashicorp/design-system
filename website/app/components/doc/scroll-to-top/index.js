/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DocScrollToTopComponent extends Component {
  @service fastboot;
  @tracked isVisible = false;

  constructor() {
    super(...arguments);
    if (!this.fastboot.isFastBoot) {
      this.addScrollListener();
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);
    if (!this.fastboot.isFastBoot) {
      this.removeScrollListener();
    }
  }

  @action
  checkScroll() {
    this.isVisible = window.scrollY > 200;
  }

  @action
  addScrollListener() {
    window.addEventListener('scroll', this.checkScroll);
  }

  @action
  removeScrollListener() {
    window.removeEventListener('scroll', this.checkScroll);
  }
}
