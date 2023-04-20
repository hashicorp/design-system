/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';

export default class HdsSideNavComponent extends Component {
  @tracked isResponsive = this.args.isResponsive ?? true;
  @tracked isMinimized = this.isResponsive; // we set it minimized by default so that if we switch viewport from desktop to mobile its already minimized
  @tracked isDesktop = true;
  hasA11yRefocus = this.args.hasA11yRefocus ?? true;

  desktopMQVal = getComputedStyle(document.documentElement).getPropertyValue(
    '--hds-app-desktop-breakpoint'
  );

  constructor() {
    super(...arguments);
    this.desktopMQ = window.matchMedia(`(min-width:${this.desktopMQVal})`);
    this.addEventListeners();
    registerDestructor(this, () => {
      this.removeEventListeners();
    });

    if (this.args.hasA11yRefocus) {
      assert(
        '@a11yRefocusSkipTo for NavigatorNarrator (a11y-refocus) in "Hds::SideNav" must have a valid value',
        this.args.a11yRefocusSkipTo !== undefined
      );
    }
  }

  addEventListeners() {
    document.addEventListener('keydown', this.escapePress, true);
    this.desktopMQ.addEventListener('change', this.updateDesktopVariable, true);
    // set initial state based on viewport
    this.updateDesktopVariable({ matches: this.desktopMQ.matches });
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this.escapePress, true);
    this.desktopMQ.removeEventListener(
      'change',
      this.updateDesktopVariable,
      true
    );
  }

  get shouldTrapFocus() {
    return this.isResponsive && !this.isDesktop && !this.isMinimized;
  }

  get classNames() {
    let classes = ['hds-side-nav'];

    // add specific class names for the different possible states
    if (this.isDesktop) {
      classes.push('hds-side-nav--is-desktop');
    } else {
      classes.push('hds-side-nav--is-mobile');
    }
    if (this.isResponsive) {
      classes.push('hds-side-nav--is-responsive');
    }
    if (this.isMinimized) {
      classes.push('hds-side-nav--is-minimized');
    } else {
      classes.push('hds-side-nav--is-not-minimized');
    }

    return classes.join(' ');
  }

  @action
  escapePress(event) {
    if (event.key === 'Escape' && !this.isMinimized) {
      this.isMinimized = true;
    }
  }

  @action
  toggleMinimizedStatus() {
    this.isMinimized = !this.isMinimized;

    let { onToggleMinimizedStatus } = this.args;

    if (typeof onToggleMinimizedStatus === 'function') {
      onToggleMinimizedStatus(this.isMinimized);
    }
  }

  @action
  updateDesktopVariable(event) {
    this.isDesktop = event.matches;

    let { onDesktopViewportChange } = this.args;

    if (typeof onDesktopViewportChange === 'function') {
      onDesktopViewportChange(this.isDesktop);
    }
  }
}
