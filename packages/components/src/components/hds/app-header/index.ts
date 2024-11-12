/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';

export interface HdsAppHeaderSignature {
  Args: {
    breakpoint?: string;
    hasA11yRefocus?: boolean;
    a11yRefocusSkipTo?: string;
    a11yRefocusSkipText?: string;
    a11yRefocusNavigationText?: string;
    a11yRefocusRouteChangeValidator?: string;
    a11yRefocusExcludeAllQueryParams?: boolean;
  };
  Blocks: {
    logo?: [];
    globalActions?: [];
    utilityActions?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAppHeader extends Component<HdsAppHeaderSignature> {
  @tracked private _isOpen = false;
  @tracked private _isDesktop = true;
  @tracked private _hasOverflowContent = false;
  private _desktopMQ: MediaQueryList;
  hasA11yRefocus = this.args.hasA11yRefocus ?? true;
  a11yRefocusSkipTo = '#' + (this.args.a11yRefocusSkipTo ?? 'hds-main');

  // Generates a unique ID for the Menu Content
  private _menuContentId = 'hds-menu-content-' + guidFor(this);

  private _breakpoint = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      '--hds-app-desktop-breakpoint'
    )
  );

  private _desktopMQVal =
    this.args.breakpoint ??
    getComputedStyle(document.documentElement).getPropertyValue(
      '--hds-app-desktop-breakpoint'
    );

  constructor(owner: unknown, args: Record<string, never>) {
    super(owner, args);
    this._desktopMQ = window.matchMedia(`(min-width: ${this._desktopMQVal})`);
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

    // set initial state based on viewport using a "synthetic" event
    const syntheticEvent = new MediaQueryListEvent('change', {
      matches: this._desktopMQ.matches,
      media: this._desktopMQ.media,
    });
    this.updateDesktopVariable(syntheticEvent);
  }

  removeEventListeners(): void {
    document.removeEventListener('keydown', this.escapePress, true);
    this._desktopMQ.removeEventListener(
      'change',
      this.updateDesktopVariable,
      true
    );
  }

  // In mobile view when the menu is open, trap focus within the AppHeader
  get shouldTrapFocus(): boolean {
    return !this._isDesktop && this._isOpen;
  }

  // Get the class names to apply to the component.
  get classNames(): string {
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

  @action
  escapePress(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this._isOpen && !this._isDesktop) {
      this._isOpen = false;
    }
  }

  @action
  onClickToggle(): void {
    this._isOpen = !this._isOpen;
  }

  @action
  updateDesktopVariable(event: MediaQueryListEvent): void {
    this._isDesktop = event.matches;

    // Close the menu when switching to desktop view
    // (prevents menu from being open when resizing which causes Skip button to not render)
    if (this._isDesktop) {
      this._isOpen = false;
    }
  }
}
