/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { next, later, cancel } from '@ember/runloop';
import { defaultValidator } from 'ember-a11y-refocus';

export default class ApplicationController extends Controller {
  @service router;
  @service fastboot;

  // notice: don't set it to false, otherwise the sidebar menu will appear open on page load
  @tracked isSidebarVisibleOnSmallViewport;

  constructor() {
    super(...arguments);
    this.router.on('routeDidChange', this, 'routeDidChange');
  }

  routeDidChange() {
    // eslint-disable-next-line ember/no-runloop
    scheduleOnce('afterRender', this, this.resetSidebar);
    // eslint-disable-next-line ember/no-runloop
    scheduleOnce('afterRender', this, this.scrollToId);
  }

  willDestroy() {
    this.router.off('routeDidChange', this, 'routeDidChange');
  }

  get currentTopRoute() {
    return this.router.currentURL.split('/')[1];
  }

  resetSidebar() {
    this.isSidebarVisibleOnSmallViewport = false;
    if (!this.fastboot.isFastBoot) {
      document.body.classList.remove('isSidebarVisibleOnSmallViewport');
      document.body.classList.remove('isSidebarInRenderTree');
      if (this.runNext) {
        // eslint-disable-next-line ember/no-runloop
        cancel(this.runNext);
      }
      if (this.runLater) {
        // eslint-disable-next-line ember/no-runloop
        cancel(this.runLater);
      }
    }
  }

  scrollToId() {
    // eslint-disable-next-line ember/no-runloop
    later(
      this,
      function () {
        let id = this.target?.url?.split('#')[1];
        if (id) {
          document.getElementById(id)?.scrollIntoView();
        }
      },
      1
    );
  }

  showSidebarOnSmallViewport() {
    if (!this.fastboot.isFastBoot) {
      document.body.classList.add('isSidebarInRenderTree');
      if (this.runLater) {
        // eslint-disable-next-line ember/no-runloop
        cancel(this.runLater);
      }
      // eslint-disable-next-line ember/no-runloop
      this.runNext = next(() => {
        document.body.classList.add('isSidebarVisibleOnSmallViewport');
      });
    }
  }

  hideSidebarOnSmallViewport() {
    if (!this.fastboot.isFastBoot) {
      document.body.classList.remove('isSidebarVisibleOnSmallViewport');
      if (this.runNext) {
        // eslint-disable-next-line ember/no-runloop
        cancel(this.runNext);
      }
      // eslint-disable-next-line ember/no-runloop
      this.runLater = later(() => {
        document.body.classList.remove('isSidebarInRenderTree');
      }, 250);
    }
  }

  transitionValidator(transition) {
    // Disable transition validation if we're transitioning to the same page
    // and the page is has a filter functionality based on `queryParams`
    // namely the Icon library or the Tokens page
    let hasTabs = (document.querySelector('.doc-page-tabs') != null);
    if (
      transition.from.params.path === transition.to.params.path &&
      (transition.from.params.path === 'icons/library' ||
        transition.from.params.path === 'foundations/tokens' ||
        hasTabs)
    ) {
      return false;
    } else {
      return defaultValidator(transition);
    }
  }

  @action
  onToggleBurgerMenu() {
    if (this.isSidebarVisibleOnSmallViewport === false) {
      this.isSidebarVisibleOnSmallViewport = true;
      this.showSidebarOnSmallViewport();
    } else {
      this.isSidebarVisibleOnSmallViewport = false;
      this.hideSidebarOnSmallViewport();
    }
  }
}
