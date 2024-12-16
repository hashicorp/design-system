import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-DSLVWx63.js';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { registerDestructor } from '@ember/destroyable';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! IMPORTANT: we need to add \"squishies\" here (~) because otherwise the whitespace added by Ember causes the empty element to still have visible padding - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}\n<div\n  class={{this.classNames}}\n  ...attributes\n  {{on \"transitionstart\" (fn this.setTransition \"start\")}}\n  {{on \"transitionend\" (fn this.setTransition \"end\")}}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap isActive=this.shouldTrapFocus}}\n  {{did-insert this.didInsert}}\n>\n  <h2 class=\"sr-only\" id=\"hds-app-side-nav-header\">Application local navigation</h2>\n\n  <div class=\"hds-app-side-nav__wrapper\">\n    {{#if this.showToggleButton}}\n      {{! template-lint-disable no-invalid-interactive}}\n      <div class=\"hds-app-side-nav__overlay\" {{on \"click\" this.toggleMinimizedStatus}} />\n      {{! template-lint-enable no-invalid-interactive}}\n      <Hds::AppSideNav::ToggleButton\n        aria-labelledby=\"hds-app-side-nav-header\"\n        aria-expanded={{if this._isMinimized \"false\" \"true\"}}\n        @icon={{if this._isMinimized \"chevrons-right\" \"chevrons-left\"}}\n        {{on \"click\" this.toggleMinimizedStatus}}\n      />\n    {{/if}}\n\n    <div class=\"hds-app-side-nav__wrapper-body\">\n      {{~yield~}}\n    </div>\n  </div>\n</div>");

var _class, _descriptor, _descriptor2, _descriptor3;
let HdsAppSideNav = (_class = class HdsAppSideNav extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "_isMinimized", _descriptor, this);
    _initializerDefineProperty(this, "_isAnimating", _descriptor2, this);
    _initializerDefineProperty(this, "_isDesktop", _descriptor3, this);
    _defineProperty(this, "_body", void 0);
    _defineProperty(this, "_bodyInitialOverflowValue", '');
    _defineProperty(this, "_desktopMQ", void 0);
    _defineProperty(this, "_containersToHide", void 0);
    _defineProperty(this, "_desktopMQVal", getComputedStyle(document.documentElement).getPropertyValue('--hds-app-desktop-breakpoint'));
    this._isMinimized = this.args.isMinimized ?? false; // sets the default state on 'desktop' viewports
    this._desktopMQ = window.matchMedia(`(min-width:${this._desktopMQVal})`);
    this.addEventListeners();
    registerDestructor(this, () => {
      this.removeEventListeners();
    });
  }
  addEventListeners() {
    document.addEventListener('keydown', this.escapePress, true);
    this._desktopMQ.addEventListener('change', this.updateDesktopVariable, true);
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
    document.removeEventListener('keydown', this.escapePress, true);
    this._desktopMQ.removeEventListener('change', this.updateDesktopVariable, true);
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
    this._containersToHide?.forEach(element => {
      if (this._isMinimized) {
        element.setAttribute('inert', '');
      } else {
        element.removeAttribute('inert');
      }
    });
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
    }
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
    if (this._isMinimized) {
      this.unlockBodyScroll();
    } else {
      this.lockBodyScroll();
    }
  }
  didInsert(element) {
    this._containersToHide = element.querySelectorAll('.hds-app-side-nav-hide-when-minimized');
    this._body = document.body;
    // Store the initial `overflow` value of `<body>` so we can reset to it
    this._bodyInitialOverflowValue = this._body.style.getPropertyValue('overflow');
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
  updateDesktopVariable(event) {
    this._isDesktop = event.matches;

    // automatically minimize on narrow viewports (when not in desktop mode)
    this._isMinimized = !this._isDesktop;
    this.synchronizeInert();
    const {
      onDesktopViewportChange
    } = this.args;
    if (typeof onDesktopViewportChange === 'function') {
      onDesktopViewportChange(this._isDesktop);
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "_isMinimized", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "_isAnimating", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "_isDesktop", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _applyDecoratedDescriptor(_class.prototype, "escapePress", [action], Object.getOwnPropertyDescriptor(_class.prototype, "escapePress"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleMinimizedStatus", [action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleMinimizedStatus"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didInsert", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsert"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setTransition", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setTransition"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateDesktopVariable", [action], Object.getOwnPropertyDescriptor(_class.prototype, "updateDesktopVariable"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsAppSideNav);

export { HdsAppSideNav as default };
//# sourceMappingURL=index.js.map
