/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';

import HdsButton from '../button/index.gts';

import hdsT from '../../../helpers/hds-t.ts';
import type { HdsButtonSignature } from '../button/index.gts';

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

  <template>
    <HdsButton
      class="hds-app-header__menu-button"
      @text={{hdsT "hds.components.common.menu" default="Menu"}}
      @icon={{this.icon}}
      @iconPosition="trailing"
      {{on "click" this.onClick}}
      aria-controls={{@menuContentId}}
      aria-expanded={{if @isOpen "true" "false"}}
      ...attributes
    />
  </template>
}
