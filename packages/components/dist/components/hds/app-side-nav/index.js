import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { registerDestructor } from '@ember/destroyable';
import { modifier } from 'ember-modifier';
import { hdsBreakpoints } from '../../../utils/hds-breakpoints.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! IMPORTANT: we need to add \"squishies\" here (~) because otherwise the whitespace added by Ember causes the empty element to still have visible padding - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}\n<div\n  class={{this.classNames}}\n  ...attributes\n  {{on \"transitionstart\" (fn this.setTransition \"start\")}}\n  {{on \"transitionend\" (fn this.setTransition \"end\")}}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap isActive=this.shouldTrapFocus}}\n  {{this._setUpBodyElement}}\n>\n  <h2 class=\"sr-only\" id=\"hds-app-side-nav-header\">Application local navigation</h2>\n\n  <div class=\"hds-app-side-nav__wrapper\">\n    {{#if this.showToggleButton}}\n      {{! template-lint-disable no-invalid-interactive}}\n      <div class=\"hds-app-side-nav__overlay\" {{on \"click\" this.toggleMinimizedStatus}} />\n      {{! template-lint-enable no-invalid-interactive}}\n      <Hds::AppSideNav::ToggleButton\n        aria-labelledby=\"hds-app-side-nav-header\"\n        aria-expanded={{if this._isMinimized \"false\" \"true\"}}\n        @icon={{if this._isMinimized \"chevrons-right\" \"chevrons-left\"}}\n        {{on \"click\" this.toggleMinimizedStatus}}\n      />\n    {{/if}}\n\n    <div class=\"hds-app-side-nav__wrapper-body\" {{this._setUpNavWrapperBody}}>\n      {{~yield~}}\n    </div>\n  </div>\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAppSideNav extends Component {
  static {
    g(this.prototype, "_isMinimized", [tracked]);
  }
  #_isMinimized = (i(this, "_isMinimized"), void 0);
  static {
    g(this.prototype, "_isAnimating", [tracked], function () {
      return false;
    });
  }
  #_isAnimating = (i(this, "_isAnimating"), void 0);
  static {
    g(this.prototype, "_isDesktop", [tracked], function () {
      return true;
    });
  }
  #_isDesktop = (i(this, "_isDesktop"), void 0);
  _body;
  _bodyInitialOverflowValue = '';
  _desktopMQ;
  _navWrapperBody;

  // we use the `lg` breakpoint for `desktop` viewports, but consumers can override its value
  _desktopMQVal = this.args.breakpoint ?? hdsBreakpoints['lg'].px;
  constructor(owner, args) {
    super(owner, args);
    this._isMinimized = this.args.isMinimized ?? false; // sets the default state on 'desktop' viewports
    this._desktopMQ = window.matchMedia(`(min-width:${this._desktopMQVal})`);
    this.addEventListeners();
    registerDestructor(this, () => {
      this.removeEventListeners();
    });
  }
  _setUpBodyElement = modifier(() => {
    this._body = document.body;
    // Store the initial `overflow` value of `<body>` so we can reset to it
    this._bodyInitialOverflowValue = this._body.style.getPropertyValue('overflow');
  });
  _setUpNavWrapperBody = modifier(element => {
    this._navWrapperBody = element;
  });
  addEventListeners() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    document.addEventListener('keydown', this.escapePress, true);
    this._desktopMQ.addEventListener('change',
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.updateDesktopVariable, true);
    // if not instantiated as minimized via arguments
    if (!this.args.isMinimized) {
      // set initial state based on viewport using a "synthetic" event
      const syntheticEvent = new MediaQueryListEvent('change', {
        matches: this._desktopMQ.matches,
        media: this._desktopMQ.media
      });
      this.updateDesktopVariable(syntheticEvent);
    }
  }
  removeEventListeners() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    document.removeEventListener('keydown', this.escapePress, true);
    this._desktopMQ.removeEventListener('change',
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.updateDesktopVariable, true);
  }

  // controls if the component reacts to viewport changes
  get isResponsive() {
    return this.args.isResponsive ?? true;
  }

  // controls if users can collapse the appsidenav on 'desktop' viewports
  get isCollapsible() {
    return this.args.isCollapsible ?? false;
  }
  get shouldTrapFocus() {
    return this.isResponsive && !this._isDesktop && !this._isMinimized;
  }
  get showToggleButton() {
    return this.isResponsive && !this._isDesktop || this.isCollapsible;
  }
  get classNames() {
    const classes = [`hds-app-side-nav`];

    // add specific class names for the different possible states
    if (this.isResponsive) {
      classes.push('hds-app-side-nav--is-responsive');
    }
    if (!this._isDesktop && this.isResponsive) {
      classes.push('hds-app-side-nav--is-mobile');
    } else {
      classes.push('hds-app-side-nav--is-desktop');
    }
    if (this._isMinimized && this.isResponsive) {
      classes.push('hds-app-side-nav--is-minimized');
    } else {
      classes.push('hds-app-side-nav--is-not-minimized');
    }
    if (this._isAnimating) {
      classes.push('hds-app-side-nav--is-animating');
    }
    return classes.join(' ');
  }
  synchronizeInert() {
    if (this._isMinimized) {
      this._navWrapperBody?.setAttribute('inert', '');
    } else {
      this._navWrapperBody?.removeAttribute('inert');
    }
  }
  lockBodyScroll() {
    if (this._body) {
      // Prevent page from scrolling when the dialog is open
      this._body.style.setProperty('overflow', 'hidden');
    }
  }
  unlockBodyScroll() {
    // Reset page `overflow` property
    if (this._body) {
      this._body.style.removeProperty('overflow');
      if (this._bodyInitialOverflowValue === '') {
        if (this._body.style.length === 0) {
          this._body.removeAttribute('style');
        }
      } else {
        this._body.style.setProperty('overflow', this._bodyInitialOverflowValue);
      }
    }
  }
  escapePress(event) {
    if (event.key === 'Escape' && !this._isMinimized && !this._isDesktop) {
      this._isMinimized = true;
      this.synchronizeInert();
      this.unlockBodyScroll();
    }
  }
  static {
    n(this.prototype, "escapePress", [action]);
  }
  toggleMinimizedStatus() {
    this._isMinimized = !this._isMinimized;
    this.synchronizeInert();
    const {
      onToggleMinimizedStatus
    } = this.args;
    if (typeof onToggleMinimizedStatus === 'function') {
      onToggleMinimizedStatus(this._isMinimized);
    }
    if (!this._isDesktop) {
      if (this._isMinimized) {
        this.unlockBodyScroll();
      } else {
        this.lockBodyScroll();
      }
    }
  }
  static {
    n(this.prototype, "toggleMinimizedStatus", [action]);
  }
  setTransition(phase, event) {
    // we only want to respond to `width` animation/transitions
    if (event.propertyName !== 'width') {
      return;
    }
    if (phase === 'start') {
      this._isAnimating = true;
    } else {
      this._isAnimating = false;
    }
  }
  static {
    n(this.prototype, "setTransition", [action]);
  }
  updateDesktopVariable(event) {
    this._isDesktop = event.matches;

    // automatically minimize on narrow viewports (when not in desktop mode)
    this._isMinimized = !this._isDesktop;
    this.synchronizeInert();
    if (this._isDesktop) {
      // make sure scrolling is enabled if the user resizes the window from mobile to desktop
      this.unlockBodyScroll();
    }
    const {
      onDesktopViewportChange
    } = this.args;
    if (typeof onDesktopViewportChange === 'function') {
      onDesktopViewportChange(this._isDesktop);
    }
  }
  static {
    n(this.prototype, "updateDesktopVariable", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsAppSideNav);

export { HdsAppSideNav as default };
//# sourceMappingURL=index.js.map
