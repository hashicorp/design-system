/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { registerDestructor } from '@ember/destroyable';

import type { HdsAppSideNavBaseSignature } from './base';

interface HdsAppSideNavSignature {
  Args: {
    isResponsive?: boolean;
    isCollapsible?: boolean;
    isMinimized?: boolean;
    toggleButtonAriaLabel?: string;
    onToggleMinimizedStatus?: (arg: boolean) => void;
    onDesktopViewportChange?: (arg: boolean) => void;
  };
  Blocks: {
    header?: [
      {
        Header?: HdsAppSideNavBaseSignature['Blocks']['header'];
        isMinimized?: boolean;
      },
    ];
    body?: [
      {
        Body?: HdsAppSideNavBaseSignature['Blocks']['body'];
        isMinimized?: boolean;
      },
    ];
    footer?: [
      {
        Footer?: HdsAppSideNavBaseSignature['Blocks']['footer'];
        isMinimized?: boolean;
      },
    ];
  };
  Element: HdsAppSideNavBaseSignature['Element'];
}

export default class HdsAppSideNav extends Component<HdsAppSideNavSignature> {
  @tracked isResponsive = this.args.isResponsive ?? true; // controls if the component reacts to viewport changes
  @tracked isMinimized = this.args.isMinimized ?? false; // sets the default state on 'desktop' viewports
  @tracked isCollapsible = this.args.isCollapsible ?? false; // controls if users can collapse the sidenav on 'desktop' viewports
  @tracked isAnimating = false;
  @tracked isDesktop = true;
  desktopMQ: MediaQueryList;
  containersToHide!: NodeListOf<Element>;

  desktopMQVal = getComputedStyle(document.documentElement).getPropertyValue(
    '--hds-app-desktop-breakpoint'
  );

  constructor(owner: unknown, args: HdsAppSideNavSignature['Args']) {
    super(owner, args);
    this.desktopMQ = window.matchMedia(`(min-width:${this.desktopMQVal})`);
    this.addEventListeners();
    registerDestructor(this, (): void => {
      this.removeEventListeners();
    });
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

  get shouldTrapFocus(): boolean {
    return this.isResponsive && !this.isDesktop && !this.isMinimized;
  }

  get showToggleButton(): boolean {
    return (this.isResponsive && !this.isDesktop) || this.isCollapsible;
  }

  get toggleButtonAriaLabel(): string {
    if (this.isMinimized) {
      return this.args.toggleButtonAriaLabel ?? 'Open menu';
    }
    return this.args.toggleButtonAriaLabel ?? 'Close menu';
  }

  get classNames(): string {
    const classes = []; // `hds-app-side-nav` is already set by the "Hds::AppSideNav::Base" component

    // add specific class names for the different possible states
    if (this.isResponsive) {
      classes.push('hds-app-side-nav--is-responsive');
    }
    if (!this.isDesktop && this.isResponsive) {
      classes.push('hds-app-side-nav--is-mobile');
    } else {
      classes.push('hds-app-side-nav--is-desktop');
    }
    if (this.isMinimized && this.isResponsive) {
      classes.push('hds-app-side-nav--is-minimized');
    } else {
      classes.push('hds-app-side-nav--is-not-minimized');
    }
    if (this.isAnimating) {
      classes.push('hds-app-side-nav--is-animating');
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
      '.hds-app-side-nav-hide-when-minimized'
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
