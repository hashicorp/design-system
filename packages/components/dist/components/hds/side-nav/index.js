import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::SideNav::Base\n  class={{this.classNames}}\n  ...attributes\n  {{on \"transitionstart\" (fn this.setTransition \"start\")}}\n  {{on \"transitionend\" (fn this.setTransition \"end\")}}\n  {{focus-trap isActive=this.shouldTrapFocus}}\n  {{did-insert this.didInsert}}\n>\n  <:root>\n    {{#if this.hasA11yRefocus}}\n      <NavigationNarrator\n        @routeChangeValidator={{@a11yRefocusRouteChangeValidator}}\n        @skipTo=\"#{{@a11yRefocusSkipTo}}\"\n        @skipText={{@a11yRefocusSkipText}}\n        @navigationText={{@a11yRefocusNavigationText}}\n      />\n    {{/if}}\n    {{#if this.showToggleButton}}\n      {{! template-lint-disable no-invalid-interactive}}\n      <div class=\"hds-side-nav__overlay\" {{on \"click\" this.toggleMinimizedStatus}} />\n      {{! template-lint-enable no-invalid-interactive}}\n      <Hds::SideNav::ToggleButton\n        aria-label={{this.ariaLabel}}\n        @icon={{if this.isMinimized \"chevrons-right\" \"chevrons-left\"}}\n        {{on \"click\" this.toggleMinimizedStatus}}\n      />\n    {{/if}}\n  </:root>\n  <:header as |Header|>\n    {{yield (hash Header=Header isMinimized=this.isMinimized) to=\"header\"}}\n  </:header>\n  <:body as |Body|>\n    {{yield (hash Body=Body isMinimized=this.isMinimized) to=\"body\"}}\n  </:body>\n  <:footer as |Footer|>\n    {{yield (hash Footer=Footer isMinimized=this.isMinimized) to=\"footer\"}}\n  </:footer>\n</Hds::SideNav::Base>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsSideNavComponent extends Component {
  static {
    g(this.prototype, "isResponsive", [tracked], function () {
      return this.args.isResponsive ?? true;
    });
  }
  #isResponsive = (i(this, "isResponsive"), void 0);
  static {
    g(this.prototype, "isMinimized", [tracked], function () {
      return this.args.isMinimized ?? false;
    });
  }
  #isMinimized = (i(this, "isMinimized"), void 0); // controls if the component reacts to viewport changes
  static {
    g(this.prototype, "isCollapsible", [tracked], function () {
      return this.args.isCollapsible ?? false;
    });
  }
  #isCollapsible = (i(this, "isCollapsible"), void 0); // sets the default state on 'desktop' viewports
  static {
    g(this.prototype, "isAnimating", [tracked], function () {
      return false;
    });
  }
  #isAnimating = (i(this, "isAnimating"), void 0); // controls if users can collapse the sidenav on 'desktop' viewports
  static {
    g(this.prototype, "isDesktop", [tracked], function () {
      return true;
    });
  }
  #isDesktop = (i(this, "isDesktop"), void 0);
  hasA11yRefocus = this.args.hasA11yRefocus ?? true;
  desktopMQVal = getComputedStyle(document.documentElement).getPropertyValue('--hds-app-desktop-breakpoint');
  constructor() {
    super(...arguments);
    this.desktopMQ = window.matchMedia(`(min-width:${this.desktopMQVal})`);
    this.addEventListeners();
    registerDestructor(this, () => {
      this.removeEventListeners();
    });
    if (this.args.hasA11yRefocus) {
      assert('@a11yRefocusSkipTo for NavigatorNarrator (a11y-refocus) in "Hds::SideNav" must have a valid value', this.args.a11yRefocusSkipTo !== undefined);
    }
  }
  addEventListeners() {
    document.addEventListener('keydown', this.escapePress, true);
    this.desktopMQ.addEventListener('change', this.updateDesktopVariable, true);
    // if not instantiated as minimized via arguments
    if (!this.args.isMinimized) {
      // set initial state based on viewport
      this.updateDesktopVariable({
        matches: this.desktopMQ.matches
      });
    }
  }
  removeEventListeners() {
    document.removeEventListener('keydown', this.escapePress, true);
    this.desktopMQ.removeEventListener('change', this.updateDesktopVariable, true);
  }
  get shouldTrapFocus() {
    return this.isResponsive && !this.isDesktop && !this.isMinimized;
  }
  get showToggleButton() {
    return this.isResponsive && !this.isDesktop || this.isCollapsible;
  }

  /**
   * @param ariaLabel
   * @type {string}
   * @default 'close menu'
   */
  get ariaLabel() {
    if (this.isMinimized) {
      return this.args.ariaLabel ?? 'Open menu';
    }
    return this.args.ariaLabel ?? 'Close menu';
  }
  get classNames() {
    let classes = []; // `hds-side-nav` is already set by the "Hds::SideNav::Base" component

    // add specific class names for the different possible states
    if (this.isResponsive) {
      classes.push('hds-side-nav--is-responsive');
    }
    if (!this.isDesktop && this.isResponsive) {
      classes.push('hds-side-nav--is-mobile');
    } else {
      classes.push('hds-side-nav--is-desktop');
    }
    if (this.isMinimized && this.isResponsive) {
      classes.push('hds-side-nav--is-minimized');
    } else {
      classes.push('hds-side-nav--is-not-minimized');
    }
    if (this.isAnimating) {
      classes.push('hds-side-nav--is-animating');
    }
    return classes.join(' ');
  }
  escapePress(event) {
    if (event.key === 'Escape' && !this.isMinimized && !this.isDesktop) {
      this.isMinimized = true;
    }
  }
  static {
    n(this.prototype, "escapePress", [action]);
  }
  toggleMinimizedStatus() {
    this.isMinimized = !this.isMinimized;
    this.containersToHide.forEach(element => {
      if (this.isMinimized) {
        element.setAttribute('inert', '');
      } else {
        element.removeAttribute('inert');
      }
    });
    let {
      onToggleMinimizedStatus
    } = this.args;
    if (typeof onToggleMinimizedStatus === 'function') {
      onToggleMinimizedStatus(this.isMinimized);
    }
  }
  static {
    n(this.prototype, "toggleMinimizedStatus", [action]);
  }
  didInsert(element) {
    this.containersToHide = element.querySelectorAll('.hds-side-nav-hide-when-minimized');
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
  setTransition(phase, event) {
    // we only want to respond to `width` animation/transitions
    if (event.propertyName !== 'width') {
      return;
    }
    if (phase === 'start') {
      this.isAnimating = true;
    } else {
      this.isAnimating = false;
    }
  }
  static {
    n(this.prototype, "setTransition", [action]);
  }
  updateDesktopVariable(event) {
    this.isDesktop = event.matches;

    // automatically minimize on narrow viewports (when not in desktop mode)
    this.isMinimized = !this.isDesktop;
    let {
      onDesktopViewportChange
    } = this.args;
    if (typeof onDesktopViewportChange === 'function') {
      onDesktopViewportChange(this.isDesktop);
    }
  }
  static {
    n(this.prototype, "updateDesktopVariable", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsSideNavComponent);

export { HdsSideNavComponent as default };
//# sourceMappingURL=index.js.map
