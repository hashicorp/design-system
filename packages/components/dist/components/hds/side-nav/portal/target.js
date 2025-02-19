import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { macroCondition, isTesting } from '@embroider/macros';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class=\"hds-side-nav__content\" ...attributes>\n  <PortalTarget\n    @multiple={{true}}\n    @onChange={{this.panelsChanged}}\n    @name={{if @targetName @targetName \"hds-side-nav-portal-target\"}}\n    class=\"hds-side-nav__content-panels hds-side-nav-hide-when-minimized\"\n    {{did-update this.didUpdateSubnav this.numSubnavs}}\n  />\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsSideNavPortalTarget extends Component {
  static {
    g(this.prototype, "router", [inject]);
  }
  #router = (i(this, "router"), undefined);
  static {
    g(this.prototype, "numSubnavs", [tracked], function () {
      return 0;
    });
  }
  #numSubnavs = (i(this, "numSubnavs"), undefined);
  static {
    g(this.prototype, "lastPanelEl", [tracked]);
  }
  #lastPanelEl = (i(this, "lastPanelEl"), undefined);
  static get prefersReducedMotionOverride() {
    return macroCondition(isTesting()) ? true : false;
  }
  prefersReducedMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  get prefersReducedMotion() {
    return HdsSideNavPortalTarget.prefersReducedMotionOverride || this.prefersReducedMotionMQ && this.prefersReducedMotionMQ.matches;
  }
  panelsChanged(portalCount) {
    this.numSubnavs = portalCount;
  }
  static {
    n(this.prototype, "panelsChanged", [action]);
  }
  didUpdateSubnav(element, [count]) {
    this.animateSubnav(element, [count]);
  }
  static {
    n(this.prototype, "didUpdateSubnav", [action]);
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
      if (macroCondition(isTesting())) {
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
  static {
    n(this.prototype, "animateSubnav", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsSideNavPortalTarget);

export { HdsSideNavPortalTarget as default };
//# sourceMappingURL=target.js.map
