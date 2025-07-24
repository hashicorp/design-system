import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { registerDestructor } from '@ember/destroyable';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n{{!\n  THIS COMPONENT IS NOW DEPRECATED\n}}\n\n{{! IMPORTANT: we need to add \"squishies\" here (~) because otherwise the whitespace added by Ember causes the empty element to still have visible padding - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}\n\n<Hds::SideNav::Base\n  class={{concat this.classNames (unless (has-block \"header\") \" hds-side-nav--is-headerless\")}}\n  ...attributes\n  {{on \"transitionstart\" (fn this.setTransition \"start\")}}\n  {{on \"transitionend\" (fn this.setTransition \"end\")}}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap isActive=this.shouldTrapFocus}}\n  {{did-insert this.didInsert}}\n>\n  <:root>\n    {{#if this.hasA11yRefocus}}\n      {{! @glint-expect-error - `ember-a11y-refocus` doesn\'t expose types yet }}\n      <NavigationNarrator\n        @routeChangeValidator={{@a11yRefocusRouteChangeValidator}}\n        @skipTo={{this.a11yRefocusSkipTo}}\n        @skipText={{@a11yRefocusSkipText}}\n        @navigationText={{@a11yRefocusNavigationText}}\n        @excludeAllQueryParams={{@a11yRefocusExcludeAllQueryParams}}\n      />\n    {{/if}}\n    {{#if this.showToggleButton}}\n      {{! template-lint-disable no-invalid-interactive}}\n      <div class=\"hds-side-nav__overlay\" {{on \"click\" this.toggleMinimizedStatus}} />\n      {{! template-lint-enable no-invalid-interactive}}\n      <Hds::SideNav::ToggleButton\n        aria-label={{this.ariaLabel}}\n        aria-labelledby={{unless this.ariaLabel \"hds-side-nav-header\"}}\n        aria-expanded={{if this.isMinimized \"false\" \"true\"}}\n        @icon={{if this.isMinimized \"chevrons-right\" \"chevrons-left\"}}\n        {{on \"click\" this.toggleMinimizedStatus}}\n      />\n    {{/if}}\n  </:root>\n  <:header as |Header|>\n    {{~yield (hash Header=Header isMinimized=this.isMinimized) to=\"header\"~}}\n  </:header>\n  <:body as |Body|>\n    {{~yield (hash Body=Body isMinimized=this.isMinimized) to=\"body\"~}}\n  </:body>\n  <:footer as |Footer|>\n    {{~yield (hash Footer=Footer isMinimized=this.isMinimized) to=\"footer\"~}}\n  </:footer>\n</Hds::SideNav::Base>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsSideNav extends Component {
  static {
    g(this.prototype, "isAnimating", [tracked], function () {
      return false;
    });
  }
  #isAnimating = (i(this, "isAnimating"), void 0);
  static {
    g(this.prototype, "isDesktop", [tracked], function () {
      return true;
    });
  }
  #isDesktop = (i(this, "isDesktop"), void 0);
  static {
    g(this.prototype, "isMinimized", [tracked], function () {
      return false;
    });
  }
  #isMinimized = (i(this, "isMinimized"), void 0);
  desktopMQ;
  containersToHide;
  hasA11yRefocus = this.args.hasA11yRefocus ?? true;
  a11yRefocusSkipTo = '#' + (this.args.a11yRefocusSkipTo ?? 'hds-main');
  desktopMQVal = getComputedStyle(document.documentElement).getPropertyValue('--hds-app-desktop-breakpoint');
  constructor(owner, args) {
    super(owner, args);
    // sets the default minimized state on 'desktop' viewports
    this.isMinimized = this.args.isMinimized ?? false;
    this.desktopMQ = window.matchMedia(`(min-width:${this.desktopMQVal})`);
    this.addEventListeners();
    registerDestructor(this, () => {
      this.removeEventListeners();
    });
    deprecate('The `Hds::SideNav` component is now deprecated and will be removed in the next major version of `@hashicorp/design-system-components`. Use `Hds::AppSideNav` instead.', false, {
      id: 'hds.components.sidenav',
      until: '5.0.0',
      url: 'https://helios.hashicorp.design/components/side-nav?tab=version%20history#4140',
      for: '@hashicorp/design-system-components',
      since: {
        available: '4.19.0',
        enabled: '5.0.0'
      }
    });
    if (args.ariaLabel !== undefined) {
      deprecate('The `@ariaLabel` argument for "Hds::SideNav" has been deprecated. It is replaced by aria-labelledby and aria-expanded on the toggle button', false, {
        id: 'hds.sidenav',
        until: '5.0.0',
        url: 'https://helios.hashicorp.design/components/side-nav?tab=version%20history#4140',
        for: '@hashicorp/design-system-components',
        since: {
          available: '4.14.0',
          enabled: '5.0.0'
        }
      });
    }
  }
  addEventListeners() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    document.addEventListener('keydown', this.escapePress, true);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.desktopMQ.addEventListener('change', this.updateDesktopVariable, true);
    // if not instantiated as minimized via arguments
    if (!this.args.isMinimized) {
      // set initial state based on viewport using a "synthetic" event
      const syntheticEvent = new MediaQueryListEvent('change', {
        matches: this.desktopMQ.matches,
        media: this.desktopMQ.media
      });
      this.updateDesktopVariable(syntheticEvent);
    }
  }
  removeEventListeners() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    document.removeEventListener('keydown', this.escapePress, true);
    this.desktopMQ.removeEventListener('change',
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
    return this.isResponsive && !this.isDesktop && !this.isMinimized;
  }
  get showToggleButton() {
    return this.isResponsive && !this.isDesktop || this.isCollapsible;
  }

  /**
   * @deprecated The `@ariaLabel` argument for "Hds::SideNav" has been deprecated. It is replaced by aria-labelledby and aria-expanded on the toggle button
   */
  get ariaLabel() {
    return this.args.ariaLabel;
  }
  get classNames() {
    const classes = []; // `hds-side-nav` is already set by the "Hds::SideNav::Base" component

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
  synchronizeInert() {
    this.containersToHide?.forEach(element => {
      if (this.isMinimized) {
        element.setAttribute('inert', '');
      } else {
        element.removeAttribute('inert');
      }
    });
  }
  escapePress(event) {
    if (event.key === 'Escape' && !this.isMinimized && !this.isDesktop) {
      this.isMinimized = true;
      this.synchronizeInert();
    }
  }
  static {
    n(this.prototype, "escapePress", [action]);
  }
  toggleMinimizedStatus() {
    this.isMinimized = !this.isMinimized;
    this.synchronizeInert();
    const {
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
    this.synchronizeInert();
    const {
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
setComponentTemplate(TEMPLATE, HdsSideNav);

export { HdsSideNav as default };
//# sourceMappingURL=index.js.map
