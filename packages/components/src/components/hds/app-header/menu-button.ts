/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import type { HdsButtonSignature } from '../button/';

export interface HdsAppHeaderMenuButtonSignature {
  Args: {
    isOpen?: boolean;
    menuContentId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClickToggle?: (event: MouseEvent, ...args: any[]) => void;
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsAppHeaderMenuButtonComponent extends Component<HdsAppHeaderMenuButtonSignature> {
  @action
  onClick(event: MouseEvent): void {
    const { onClickToggle } = this.args;

    if (typeof onClickToggle === 'function') {
      onClickToggle(event);
    }
  }

  get icon(): 'x' | 'menu' {
    return this.args.isOpen ? 'x' : 'menu';
  }

  // Get the class names to apply to the component.
  get classNames(): string {
    const classes = ['hds-app-header__menu-button'];

    return classes.join(' ');
  }
}
