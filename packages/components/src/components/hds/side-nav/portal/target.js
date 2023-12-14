/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { DEBUG } from '@glimmer/env';
import Ember from 'ember';

export default class SidenavPortalTarget extends Component {
  @service router;

  @tracked numSubnavs = 0;
  @tracked lastPanelEl = null;

  static get prefersReducedMotionOverride() {
    return Ember.testing;
  }

  prefersReducedMotionMQ = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  get prefersReducedMotion() {
    return (
      this.constructor.prefersReducedMotionOverride ||
      (this.prefersReducedMotionMQ && this.prefersReducedMotionMQ.matches)
    );
  }

  @action
  panelsChanged(portalCount) {
    this.numSubnavs = portalCount;
  }

  @action
  didUpdateSubnav(element, [count]) {
    this.animateSubnav(element, [count]);
  }

  @action
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

    let activeIndex = count - 1;
    let targetElement = element;
    let { prefersReducedMotion } = this;

    let styles = getComputedStyle(targetElement);
    let columnWidth = styles.getPropertyValue(
      '--hds-app-sidenav-width-expanded'
    );
    let slideDuration = prefersReducedMotion ? 0 : 150;
    let fadeDuration = prefersReducedMotion ? 0 : 175;
    let fadeDelay = prefersReducedMotion ? 0 : 50;

    // slide entire parent panel
    let start = styles.transform;
    let end = `translateX(-${activeIndex * parseInt(columnWidth, 10)}px)`;
    let anim = targetElement.animate(
      [{ transform: start }, { transform: end }],
      {
        duration: slideDuration,
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
        fill: 'forwards',
      }
    );

    anim.finished.then(() => {
      // uncomment this if we need/want to scroll the element to the top
      // targetElement.scrollIntoView(true);
      if (activeIndex > 0) {
        let allPrev = Array.from(targetElement.children).slice(0, activeIndex);
        for (let ele of allPrev) {
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
    let nextPanelEl = targetElement.children[activeIndex];

    // get reference to last child panel
    let lastPanelEl = targetElement.children[targetElement.children.length - 1];

    if (nextPanelEl) {
      nextPanelEl.ariaHidden = 'false';
      nextPanelEl.style.setProperty('visibility', 'visible');
      // this eliminates a flicker if there's only one subnav rendering or if we
      // already just rendered this panel.
      if (activeIndex === 0 || nextPanelEl.isSameNode(this.lastPanelEl)) {
        fadeDelay = 0;
        fadeDuration = 0;
      }

      // remember the last panel
      this.lastPanelEl = lastPanelEl;

      nextPanelEl.animate([{ opacity: '0' }, { opacity: '1' }], {
        delay: fadeDelay,
        duration: fadeDuration,
        fill: 'forwards',
      });
    }
  }
}
