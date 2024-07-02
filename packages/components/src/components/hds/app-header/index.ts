/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';

export interface HdsAppHeaderSignature {
  Blocks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalItems?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    utilityItems?: any;
  };
  Element: HTMLDivElement;
}
// More info on types and signatures: https://github.com/hashicorp/design-system/blob/main/wiki/TypeScript-Migration.md

export default class HdsAppHeaderComponent extends Component<HdsAppHeaderSignature> {
  @tracked isOpen = false;

  @action
  onClickToggle() {
    this.isOpen = !this.isOpen;
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
      classes.push('hds-app-header__menu-is-open');
    }

    return classes.join(' ');
  }
}
