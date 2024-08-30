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
    onClickToggle?: () => void;
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsAppHeaderMenuButton extends Component<HdsAppHeaderMenuButtonSignature> {
  get icon(): 'x' | 'menu' {
    return this.args.isOpen ? 'x' : 'menu';
  }

  @action
  onClick(): void {
    const { onClickToggle } = this.args;

    if (typeof onClickToggle === 'function') {
      onClickToggle();
    }
  }
}
