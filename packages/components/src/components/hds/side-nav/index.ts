/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { registerDestructor } from '@ember/destroyable';

import type { HdsSideNavBaseSignature } from './base';
import type Owner from '@ember/owner';

export interface HdsSideNavSignature {
  Args: {
    isResponsive?: boolean;
    isCollapsible?: boolean;
    isMinimized?: boolean;
    hasA11yRefocus?: boolean;
    a11yRefocusSkipTo?: string;
    a11yRefocusSkipText?: string;
    a11yRefocusNavigationText?: string;
    a11yRefocusRouteChangeValidator?: string;
    a11yRefocusExcludeAllQueryParams?: boolean;
    /**
     * @deprecated The `@ariaLabel` argument for "Hds::SideNav" has been deprecated. It is replaced by aria-labelledby and aria-expanded on the toggle button
     */
    ariaLabel?: string | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onToggleMinimizedStatus?: (arg: boolean) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDesktopViewportChange?: (arg: boolean) => void;
  };
  Blocks: {
    header?: [
      {
        Header?: HdsSideNavBaseSignature['Blocks']['header'];
        isMinimized?: boolean;
      },
    ];
    body?: [
      {
        Body?: HdsSideNavBaseSignature['Blocks']['body'];
        isMinimized?: boolean;
      },
    ];
    footer?: [
      {
        Footer?: HdsSideNavBaseSignature['Blocks']['footer'];
        isMinimized?: boolean;
      },
    ];
  };
  Element: HdsSideNavBaseSignature['Element'];
}

export default class HdsSideNav extends Component<HdsSideNavSignature> {
  @tracked isAnimating = false;
  @tracked isDesktop = true;
  @tracked isMinimized = false;

  desktopMQ: MediaQueryList;
  containersToHide!: NodeListOf<Element>;
  hasA11yRefocus = this.args.hasA11yRefocus ?? true;
  a11yRefocusSkipTo = '#' + (this.args.a11yRefocusSkipTo ?? 'hds-main');

  desktopMQVal = getComputedStyle(document.documentElement).getPropertyValue(
    '--hds-app-desktop-breakpoint'
  );

  constructor(owner: Owner, args: HdsSideNavSignature['Args']) {
    super(owner, args);
    // sets the default minimized state on 'desktop' viewports
    this.isMinimized = this.args.isMinimized ?? false;
    this.desktopMQ = window.matchMedia(`(min-width:${this.desktopMQVal})`);
    this.addEventListeners();
    registerDestructor(this, (): void => {
      this.removeEventListeners();
    });

    if (args.ariaLabel !== undefined) {
      deprecate(
        'The `@ariaLabel` argument for "Hds::SideNav" has been deprecated. It is replaced by aria-labelledby and aria-expanded on the toggle button',
        false,
        {
          id: 'hds.sidenav',
          until: '5.0.0',
          url: 'https://helios.hashicorp.design/components/side-nav?tab=version%20history#4140',
          for: '@hashicorp/design-system-components',
          since: {
            available: '4.14.0',
            enabled: '5.0.0',
          },
        }
      );
    }
  }

  addEventListeners(): void {
    document.addEventListener('keydown', this.escapePress, true);
    this.desktopMQ.addEventListener('change', this.updateDesktopVariable, true);
    // if not instantiated as minimized via arguments
    if (!this.args.isMinimized) {
      // set initial state based on viewport using a "synthetic" event
      const syntheticEvent = new MediaQueryListEvent('change', {
        matches: this.desktopMQ.matches,
        media: this.desktopMQ.media,
      });
      this.updateDesktopVariable(syntheticEvent);
    }
  }

  removeEventListeners(): void {
    document.removeEventListener('keydown', this.escapePress, true);
    this.desktopMQ.removeEventListener(
      'change',
      this.updateDesktopVariable,
      true
    );
  }

  // controls if the component reacts to viewport changes
  get isResponsive(): boolean {
    return this.args.isResponsive ?? true;
  }

  // controls if users can collapse the appsidenav on 'desktop' viewports
  get isCollapsible(): boolean {
    return this.args.isCollapsible ?? false;
  }

  get shouldTrapFocus(): boolean {
    return this.isResponsive && !this.isDesktop && !this.isMinimized;
  }

  get showToggleButton(): boolean {
    return (this.isResponsive && !this.isDesktop) || this.isCollapsible;
  }

  /**
   * @deprecated The `@ariaLabel` argument for "Hds::SideNav" has been deprecated. It is replaced by aria-labelledby and aria-expanded on the toggle button
   */
  get ariaLabel(): string | undefined {
    return this.args.ariaLabel;
  }

  get classNames(): string {
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

  synchronizeInert(): void {
    this.containersToHide?.forEach((element): void => {
      if (this.isMinimized) {
        element.setAttribute('inert', '');
      } else {
        element.removeAttribute('inert');
      }
    });
  }

  @action
  escapePress(event: KeyboardEvent): void {
    if (event.key === 'Escape' && !this.isMinimized && !this.isDesktop) {
      this.isMinimized = true;
      this.synchronizeInert();
    }
  }

  @action
  toggleMinimizedStatus(): void {
    this.isMinimized = !this.isMinimized;

    this.synchronizeInert();

    const { onToggleMinimizedStatus } = this.args;

    if (typeof onToggleMinimizedStatus === 'function') {
      onToggleMinimizedStatus(this.isMinimized);
    }
  }

  @action
  didInsert(element: HTMLElement): void {
    this.containersToHide = element.querySelectorAll(
      '.hds-side-nav-hide-when-minimized'
    );
  }

  @action
  setTransition(phase: string, event: TransitionEvent): void {
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

  @action
  updateDesktopVariable(event: MediaQueryListEvent): void {
    this.isDesktop = event.matches;

    // automatically minimize on narrow viewports (when not in desktop mode)
    this.isMinimized = !this.isDesktop;

    this.synchronizeInert();

    const { onDesktopViewportChange } = this.args;

    if (typeof onDesktopViewportChange === 'function') {
      onDesktopViewportChange(this.isDesktop);
    }
  }
}
