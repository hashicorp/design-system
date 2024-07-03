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
  Blocks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalItemsBefore?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalItemsAfter?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    utilityItems?: any;
  };
  Element: HTMLDivElement;
}
// More info on types and signatures: https://github.com/hashicorp/design-system/blob/main/wiki/TypeScript-Migration.md

export default class HdsAppHeaderComponent extends Component<HdsAppHeaderSignature> {
  @tracked isOpen = false;
  @tracked isDesktop = true;
  desktopMQ: MediaQueryList;

  desktopMQVal = getComputedStyle(document.documentElement).getPropertyValue(
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

  addEventListeners() {
    this.desktopMQ.addEventListener('change', this.updateDesktopVariable, true);

    // set initial state based on viewport using a "synthetic" event
    const syntheticEvent = new MediaQueryListEvent('change', {
      matches: this.desktopMQ.matches,
      media: this.desktopMQ.media,
    });
    this.updateDesktopVariable(syntheticEvent);
  }

  removeEventListeners() {
    this.desktopMQ.removeEventListener(
      'change',
      this.updateDesktopVariable,
      true
    );
  }

  /**
   * Generates a unique ID for the Menu Content
   *
   * @param menuContentId
   */
  menuContentId = 'menu-content-' + guidFor(this);

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-app-header'];

    // add a class based on the @isOpen argument
    if (this.isOpen) {
      classes.push('hds-app-header--menu-is-open');
    }

    if (!this.isDesktop) {
      classes.push('hds-app-header--is-mobile');
    } else {
      classes.push('hds-app-header--is-desktop');
    }

    return classes.join(' ');
  }

  @action
  onClickToggle() {
    this.isOpen = !this.isOpen;
  }

  @action
  updateDesktopVariable(event: MediaQueryListEvent) {
    this.isDesktop = event.matches;
  }
}
