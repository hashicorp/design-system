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
  };
  Blocks: {
    logo?: [];
    globalActions?: [];
    utilityActions?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAppHeaderComponent extends Component<HdsAppHeaderSignature> {
  @tracked isOpen = false;
  @tracked isDesktop = true;
  desktopMQ: MediaQueryList;

  desktopMQVal =
    this.args.breakpoint ??
    getComputedStyle(document.documentElement).getPropertyValue(
      '--hds-app-desktop-breakpoint'
    );

  constructor(owner: unknown, args: Record<string, never>) {
    super(owner, args);
    this.desktopMQ = window.matchMedia(`(min-width:${this.desktopMQVal})`);
    this.addEventListeners();
    registerDestructor(this, () => {
      this.removeEventListeners();
    });
  }

  addEventListeners(): void {
    document.addEventListener('keydown', this.escapePress, true);
    this.desktopMQ.addEventListener('change', this.updateDesktopVariable, true);

    // set initial state based on viewport using a "synthetic" event
    const syntheticEvent = new MediaQueryListEvent('change', {
      matches: this.desktopMQ.matches,
      media: this.desktopMQ.media,
    });
    this.updateDesktopVariable(syntheticEvent);
  }

  removeEventListeners(): void {
    document.removeEventListener('keydown', this.escapePress, true);
    this.desktopMQ.removeEventListener(
      'change',
      this.updateDesktopVariable,
      true
    );
  }

  // Menu items display if is desktop, or if is mobile and the menu is open
  get showItems(): boolean {
    return this.isDesktop || this.isOpen;
  }

  // Generates a unique ID for the Menu Content
  menuContentId = 'hds-menu-content-' + guidFor(this);

  // Get the class names to apply to the component.
  get classNames(): string {
    const classes = ['hds-app-header'];

    if (!this.isDesktop) {
      classes.push('hds-app-header--is-mobile');
    } else {
      classes.push('hds-app-header--is-desktop');
    }

    return classes.join(' ');
  }

  @action
  escapePress(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen && !this.isDesktop) {
      this.isOpen = false;
    }
  }

  @action
  onClickToggle(): void {
    this.isOpen = !this.isOpen;
  }

  @action
  updateDesktopVariable(event: MediaQueryListEvent): void {
    this.isDesktop = event.matches;
  }
}
