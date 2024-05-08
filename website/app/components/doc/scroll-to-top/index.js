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
    this.addScrollListener();
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.removeScrollListener();
  }

  @action
  scrollToTop() {
    if (!this.fastboot.isFastBoot) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  @action
  checkScroll() {
    if (window.scrollY > 200) {
      this.isButtonVisible = true;
    } else {
      this.isButtonVisible = false;
    }
  }

  @action
  addScrollListener() {
    if (!this.fastboot.isFastBoot) {
      this.scrollFunction = () => this.checkScroll();
      window.addEventListener('scroll', this.scrollFunction);
    }
  }

  @action
  removeScrollListener() {
    if (!this.fastboot.isFastBoot) {
      window.removeEventListener('scroll', this.scrollFunction);
    }
  }
}
