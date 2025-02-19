import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div\n  class={{this.classNames}}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap isActive=this.shouldTrapFocus}}\n  ...attributes\n>\n  {{#if (and this.hasA11yRefocus (not this._isOpen))}}\n    {{! @glint-expect-error - `ember-a11y-refocus` doesn\'t expose types yet }}\n    <NavigationNarrator\n      @routeChangeValidator={{@a11yRefocusRouteChangeValidator}}\n      @skipTo={{this.a11yRefocusSkipTo}}\n      @skipText={{@a11yRefocusSkipText}}\n      @navigationText={{@a11yRefocusNavigationText}}\n      @excludeAllQueryParams={{@a11yRefocusExcludeAllQueryParams}}\n    />\n  {{/if}}\n\n  {{yield to=\"logo\"}}\n\n  {{#if (not this._isDesktop)}}\n    <Hds::AppHeader::MenuButton\n      @onClickToggle={{this.onClickToggle}}\n      @isOpen={{this._isOpen}}\n      @menuContentId={{this._menuContentId}}\n    />\n  {{/if}}\n\n  <div class=\"hds-app-header__actions\" id={{this._menuContentId}}>\n    <div class=\"hds-app-header__global-actions\">\n      {{yield to=\"globalActions\"}}\n    </div>\n\n    <div class=\"hds-app-header__utility-actions\">\n      {{yield to=\"utilityActions\"}}\n    </div>\n  </div>\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAppHeader extends Component {
  static {
    g(this.prototype, "_isOpen", [tracked], function () {
      return false;
    });
  }
  #_isOpen = (i(this, "_isOpen"), undefined);
  static {
    g(this.prototype, "_isDesktop", [tracked], function () {
      return true;
    });
  }
  #_isDesktop = (i(this, "_isDesktop"), undefined);
  static {
    g(this.prototype, "_hasOverflowContent", [tracked], function () {
      return false;
    });
  }
  #_hasOverflowContent = (i(this, "_hasOverflowContent"), undefined);
  _desktopMQ;
  hasA11yRefocus = this.args.hasA11yRefocus ?? true;
  a11yRefocusSkipTo = '#' + (this.args.a11yRefocusSkipTo ?? 'hds-main');

  // Generates a unique ID for the Menu Content
  _menuContentId = 'hds-menu-content-' + guidFor(this);
  _breakpoint = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hds-app-desktop-breakpoint'));
  _desktopMQVal = this.args.breakpoint ?? getComputedStyle(document.documentElement).getPropertyValue('--hds-app-desktop-breakpoint');
  constructor(owner, args) {
    super(owner, args);
    this._desktopMQ = window.matchMedia(`(min-width: ${this._desktopMQVal})`);
    this.addEventListeners();
    registerDestructor(this, () => {
      this.removeEventListeners();
    });
  }
  addEventListeners() {
    document.addEventListener('keydown', this.escapePress, true);
    this._desktopMQ.addEventListener('change', this.updateDesktopVariable, true);

    // set initial state based on viewport using a "synthetic" event
    const syntheticEvent = new MediaQueryListEvent('change', {
      matches: this._desktopMQ.matches,
      media: this._desktopMQ.media
    });
    this.updateDesktopVariable(syntheticEvent);
  }
  removeEventListeners() {
    document.removeEventListener('keydown', this.escapePress, true);
    this._desktopMQ.removeEventListener('change', this.updateDesktopVariable, true);
  }

  // In mobile view when the menu is open, trap focus within the AppHeader
  get shouldTrapFocus() {
    return !this._isDesktop && this._isOpen;
  }

  // Get the class names to apply to the component.
  get classNames() {
    const classes = ['hds-app-header'];
    if (this._isDesktop) {
      classes.push('hds-app-header--is-desktop');
    } else {
      classes.push('hds-app-header--is-mobile');

      // open and closed menu states are only relevant on mobile
      if (this._isOpen) {
        classes.push('hds-app-header--menu-is-open');
      } else {
        classes.push('hds-app-header--menu-is-closed');
      }
    }
    return classes.join(' ');
  }
  escapePress(event) {
    if (event.key === 'Escape' && this._isOpen && !this._isDesktop) {
      this._isOpen = false;
    }
  }
  static {
    n(this.prototype, "escapePress", [action]);
  }
  onClickToggle() {
    this._isOpen = !this._isOpen;
  }
  static {
    n(this.prototype, "onClickToggle", [action]);
  }
  updateDesktopVariable(event) {
    this._isDesktop = event.matches;

    // Close the menu when switching to desktop view
    // (prevents menu from being open when resizing which causes Skip button to not render)
    if (this._isDesktop) {
      this._isOpen = false;
    }
  }
  static {
    n(this.prototype, "updateDesktopVariable", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsAppHeader);

export { HdsAppHeader as default };
//# sourceMappingURL=index.js.map
