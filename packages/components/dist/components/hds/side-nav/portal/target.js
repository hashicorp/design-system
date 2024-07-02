import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { DEBUG } from '@glimmer/env';
import Ember from 'ember';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class=\"hds-side-nav__content\" ...attributes>\n  <PortalTarget\n    @multiple={{true}}\n    @onChange={{this.panelsChanged}}\n    @name={{if @targetName @targetName \"hds-side-nav-portal-target\"}}\n    class=\"hds-side-nav__content-panels hds-side-nav-hide-when-minimized\"\n    {{did-update this.didUpdateSubnav this.numSubnavs}}\n  />\n</div>");

var _class, _descriptor, _descriptor2, _descriptor3;
let HdsSideNavPortalTargetComponent = (_class = class HdsSideNavPortalTargetComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "router", _descriptor, this);
    _initializerDefineProperty(this, "numSubnavs", _descriptor2, this);
    _initializerDefineProperty(this, "lastPanelEl", _descriptor3, this);
    _defineProperty(this, "prefersReducedMotionMQ", window.matchMedia('(prefers-reduced-motion: reduce)'));
  }
  static get prefersReducedMotionOverride() {
    return Ember.testing;
  }
  get prefersReducedMotion() {
    return HdsSideNavPortalTargetComponent.prefersReducedMotionOverride || this.prefersReducedMotionMQ && this.prefersReducedMotionMQ.matches;
  }
  panelsChanged(portalCount) {
    this.numSubnavs = portalCount;
  }
  didUpdateSubnav(element, [count]) {
    this.animateSubnav(element, [count]);
  }
  animateSubnav(element, [count]) {
    /*
     * Here is what the layout looks like for this setup
     *
                                     SideNav
                                    +----------------------+
                                    | +------------------+ |
                                    | |    ("header")    | |
                                    | +------------------+ |
                                    |                      |
                                    | +------------------+ |
                                    | |    ("body")      | |
        (PortalTarget)              | |                  | |
        +----------------------------------------------+ | |
        | +----------+  +----------+  |  +----------+  | | |
        | | (Portal) |  | (Portal) |     | (Portal) |  | | |
        | |          |  |          |  |  |          |  | | |
        | |  hidden  |  |  hidden  |     | *active* |  | | |
        | |   panel  |  |   panel  |  |  |   panel  |  | | |
        | |          |  |          |     |          |  | | |
        | |          |  |          |  |  |          |  | | |
        | |          |  |          |     |          |  | | |
        | |          |  |          |  |  |          |  | | |
        | |          |  |          |     |          |  | | |
        | |          |  |          |  |  |          |  | | |
        | |          |  |          |     |          |  | | |
        | +----------+  +----------+  |  +----------+  | | |
        +----------------------------------------------+ | |
                                    | |                  | |
                                    | +------------------+ |
                                    |                      |
                                    | +------------------+ |
                                    | |    ("footer")    | |
                                    | +------------------+ |
                                    +----------------------+
      *
     * every time `HcAppFrame::SideNav::Portal` renders, it contains a portaled "panel"
     * that is rendered into the `hds-side-nav__content-panels` (inside the PortalTarget).
     *
     * Rendering or unrendering other `HcAppFrame::SideNav::Portal`s triggers the number of
     * subnavs to change (via `numSubnavs`), so this function runs and slides
     * `hds-side-nav__content-panels` left or right using the `element.animate` api.
     *
     * */

    const activeIndex = count - 1;
    const targetElement = element;
    const {
      prefersReducedMotion
    } = this;
    const styles = getComputedStyle(targetElement);
    const columnWidth = styles.getPropertyValue('--hds-app-sidenav-width-expanded');
    const slideDuration = prefersReducedMotion ? 0 : 150;
    let fadeDuration = prefersReducedMotion ? 0 : 175;
    let fadeDelay = prefersReducedMotion ? 0 : 50;

    // slide entire parent panel
    const start = styles.transform;
    const end = `translateX(-${activeIndex * parseInt(columnWidth, 10)}px)`;
    const anim = targetElement.animate([{
      transform: start
    }, {
      transform: end
    }], {
      duration: slideDuration,
      easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
      fill: 'forwards'
    });
    anim.finished.then(() => {
      // uncomment this if we need/want to scroll the element to the top
      // targetElement.scrollIntoView(true);
      if (activeIndex > 0) {
        const allPrev = Array.from(targetElement.children).slice(0, activeIndex);
        for (const ele of allPrev) {
          ele.ariaHidden = 'true';
          ele.style.setProperty('visibility', 'hidden');
          ele.style.setProperty('opacity', '0');
        }
      }
      // Notice: we don't add the styles by default because it writes a `style` attribute to the element and it causes an additional re-render
      if (DEBUG) {
        // Check the visibility of the element before attempting to commitStyles.
        if (targetElement.offsetParent !== null) {
          anim.commitStyles();
        }
      }
    });

    // fade in next panel
    const nextPanelEl = targetElement.children[activeIndex];

    // get reference to last child panel
    const lastPanelEl = targetElement.children[targetElement.children.length - 1];
    if (nextPanelEl) {
      nextPanelEl.ariaHidden = 'false';
      nextPanelEl.style.setProperty('visibility', 'visible');
      // this eliminates a flicker if there's only one subnav rendering or if we
      // already just rendered this panel.
      if (this.lastPanelEl) {
        if (activeIndex === 0 || nextPanelEl.isSameNode(this.lastPanelEl)) {
          fadeDelay = 0;
          fadeDuration = 0;
        }
      }

      // remember the last panel
      this.lastPanelEl = lastPanelEl;
      nextPanelEl.animate([{
        opacity: '0'
      }, {
        opacity: '1'
      }], {
        delay: fadeDelay,
        duration: fadeDuration,
        fill: 'forwards'
      });
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "router", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "numSubnavs", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "lastPanelEl", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "panelsChanged", [action], Object.getOwnPropertyDescriptor(_class.prototype, "panelsChanged"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didUpdateSubnav", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didUpdateSubnav"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "animateSubnav", [action], Object.getOwnPropertyDescriptor(_class.prototype, "animateSubnav"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsSideNavPortalTargetComponent);

export { HdsSideNavPortalTargetComponent as default };
//# sourceMappingURL=target.js.map
