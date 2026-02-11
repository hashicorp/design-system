/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import hdsT from '../../../helpers/hds-t.ts';
import HdsButton from '../button/index.gts';

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

  onClick = (): void => {
    const { onClickToggle } = this.args;

    if (typeof onClickToggle === 'function') {
      onClickToggle();
    }
  };

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
