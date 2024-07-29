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
    const main = document.getElementById('main');
    if (main) {
      const focusable = main.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) focusable[0].focus();
    }
  }

  @action
  checkScroll() {
    this.isButtonVisible = window.scrollY > 200;
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
