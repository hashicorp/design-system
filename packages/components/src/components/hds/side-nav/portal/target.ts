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

import type { HdsSideNavPortalSignature } from './index';

// import { PortalTargetSignature } from 'ember-stargate/components/portal-target';
interface PortalTargetSignature {
  Element: HTMLDivElement;
  Args: {
    name: string;
    multiple?: boolean;
    onChange?: (count: number) => void;
  };
  Blocks: {
    default: [number];
  };
}

import type { Registry as Services } from '@ember/service';

interface HdsSideNavPortalTargetSignature {
  Args: PortalTargetSignature['Args'] & {
    targetName?: HdsSideNavPortalSignature['Args']['targetName'];
  };
  Element: HTMLDivElement;
}

export default class HdsSideNavPortalTargetComponent extends Component<HdsSideNavPortalTargetSignature> {
  @service router!: Services['router'];

  @tracked numSubnavs = 0;
  @tracked lastPanelEl: Element | undefined;

  static get prefersReducedMotionOverride(): boolean {
    return Ember.testing;
  }

  prefersReducedMotionMQ = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  get prefersReducedMotion(): boolean {
    return (
      HdsSideNavPortalTargetComponent.prefersReducedMotionOverride ||
      (this.prefersReducedMotionMQ && this.prefersReducedMotionMQ.matches)
    );
  }

  @action
  panelsChanged(portalCount: number): void {
    this.numSubnavs = portalCount;
  }

  @action
  didUpdateSubnav(element: HTMLElement, [count]: [number]): void {
    this.animateSubnav(element, [count]);
  }

  @action
  animateSubnav(element: HTMLElement, [count]: [number]): void {
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
    const { prefersReducedMotion } = this;

    const styles = getComputedStyle(targetElement);
    const columnWidth = styles.getPropertyValue(
      '--hds-app-sidenav-width-expanded'
    );
    const slideDuration = prefersReducedMotion ? 0 : 150;
    let fadeDuration = prefersReducedMotion ? 0 : 175;
    let fadeDelay = prefersReducedMotion ? 0 : 50;

    // slide entire parent panel
    const start = styles.transform;
    const end = `translateX(-${activeIndex * parseInt(columnWidth, 10)}px)`;
    const anim = targetElement.animate(
      [{ transform: start }, { transform: end }],
      {
        duration: slideDuration,
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
        fill: 'forwards',
      }
    );

    anim.finished.then((): void => {
      // uncomment this if we need/want to scroll the element to the top
      // targetElement.scrollIntoView(true);
      if (activeIndex > 0) {
        const allPrev = Array.from(targetElement.children).slice(
          0,
          activeIndex
        ) as HTMLElement[];
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
    const nextPanelEl = targetElement.children[activeIndex] as HTMLElement;

    // get reference to last child panel
    const lastPanelEl = targetElement.children[
      targetElement.children.length - 1
    ] as HTMLElement;

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

      nextPanelEl.animate([{ opacity: '0' }, { opacity: '1' }], {
        delay: fadeDelay,
        duration: fadeDuration,
        fill: 'forwards',
      });
    }
  }
}
