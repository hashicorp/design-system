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
  @tracked isButtonVisible = false;

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
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @action
  checkScroll() {
    this.isButtonVisible = window.scrollY > 200;
  }

  @action
  addScrollListener() {
    if (!this.fastboot.isFastBoot) {
      window.addEventListener('scroll', this.checkScroll);
    }
  }

  @action
  removeScrollListener() {
    if (!this.fastboot.isFastBoot) {
      window.removeEventListener('scroll', this.checkScroll);
    }
  }
}
