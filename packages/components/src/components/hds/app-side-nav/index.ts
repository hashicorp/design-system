/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { registerDestructor } from '@ember/destroyable';

export interface HdsAppSideNavSignature {
  Args: {
    isResponsive?: boolean;
    isCollapsible?: boolean;
    isMinimized?: boolean;
    onToggleMinimizedStatus?: (arg: boolean) => void;
    onDesktopViewportChange?: (arg: boolean) => void;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAppSideNav extends Component<HdsAppSideNavSignature> {
  @tracked private _isMinimized;
  @tracked private _isAnimating = false;
  @tracked private _isDesktop = true;

  private _body!: HTMLElement;
  private _bodyInitialOverflowValue = '';
  private _desktopMQ: MediaQueryList;
  private _containersToHide!: NodeListOf<Element>;

  private _desktopMQVal = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--hds-app-desktop-breakpoint');

  constructor(owner: unknown, args: HdsAppSideNavSignature['Args']) {
    super(owner, args);
    this._isMinimized = this.args.isMinimized ?? false; // sets the default state on 'desktop' viewports
    this._desktopMQ = window.matchMedia(`(min-width:${this._desktopMQVal})`);
    this.addEventListeners();
    registerDestructor(this, (): void => {
      this.removeEventListeners();
    });
  }

  addEventListeners(): void {
    document.addEventListener('keydown', this.escapePress, true);
    this._desktopMQ.addEventListener(
      'change',
      this.updateDesktopVariable,
      true
    );
    // if not instantiated as minimized via arguments
    if (!this.args.isMinimized) {
      // set initial state based on viewport using a "synthetic" event
      const syntheticEvent = new MediaQueryListEvent('change', {
        matches: this._desktopMQ.matches,
        media: this._desktopMQ.media,
      });
      this.updateDesktopVariable(syntheticEvent);
    }
  }

  removeEventListeners(): void {
    document.removeEventListener('keydown', this.escapePress, true);
    this._desktopMQ.removeEventListener(
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
    return this.isResponsive && !this._isDesktop && !this._isMinimized;
  }

  get showToggleButton(): boolean {
    return (this.isResponsive && !this._isDesktop) || this.isCollapsible;
  }

  get classNames(): string {
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

  synchronizeInert(): void {
    this._containersToHide?.forEach((element): void => {
      if (this._isMinimized) {
        element.setAttribute('inert', '');
      } else {
        element.removeAttribute('inert');
      }
    });
  }

  lockBodyScroll(): void {
    if (this._body) {
      // Prevent page from scrolling when the dialog is open
      this._body.style.setProperty('overflow', 'hidden');
    }
  }

  unlockBodyScroll(): void {
    // Reset page `overflow` property
    if (this._body) {
      this._body.style.removeProperty('overflow');
      if (this._bodyInitialOverflowValue === '') {
        if (this._body.style.length === 0) {
          this._body.removeAttribute('style');
        }
      } else {
        this._body.style.setProperty(
          'overflow',
          this._bodyInitialOverflowValue
        );
      }
    }
  }

  @action
  escapePress(event: KeyboardEvent): void {
    if (event.key === 'Escape' && !this._isMinimized && !this._isDesktop) {
      this._isMinimized = true;
      this.synchronizeInert();
    }
  }

  @action
  toggleMinimizedStatus(): void {
    this._isMinimized = !this._isMinimized;
    this.synchronizeInert();

    const { onToggleMinimizedStatus } = this.args;

    if (typeof onToggleMinimizedStatus === 'function') {
      onToggleMinimizedStatus(this._isMinimized);
    }

    if (this._isMinimized) {
      this.unlockBodyScroll();
    } else {
      this.lockBodyScroll();
    }
  }

  @action
  didInsert(element: HTMLElement): void {
    this._containersToHide = element.querySelectorAll(
      '.hds-app-side-nav-hide-when-minimized'
    );
    this._body = document.body;
    // Store the initial `overflow` value of `<body>` so we can reset to it
    this._bodyInitialOverflowValue =
      this._body.style.getPropertyValue('overflow');
  }

  @action
  setTransition(phase: string, event: TransitionEvent): void {
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

  @action
  updateDesktopVariable(event: MediaQueryListEvent): void {
    this._isDesktop = event.matches;

    // automatically minimize on narrow viewports (when not in desktop mode)
    this._isMinimized = !this._isDesktop;

    this.synchronizeInert();

    const { onDesktopViewportChange } = this.args;

    if (typeof onDesktopViewportChange === 'function') {
      onDesktopViewportChange(this._isDesktop);
    }
  }
}
