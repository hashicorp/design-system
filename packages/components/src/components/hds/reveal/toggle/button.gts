/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import HdsButton from '../../button/index.gts';

import type { HdsButtonSignature } from '../../button/index.gts';

export interface HdsRevealToggleButtonSignature {
  Args: {
    text: string;
    isOpen?: boolean;
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsRevealToggleButton extends Component<HdsRevealToggleButtonSignature> {
  get classNames(): string {
    const classes = ['hds-reveal__toggle-button'];

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-reveal__toggle-button--is-open');
    }

    return classes.join(' ');
  }

  <template>
    <HdsButton
      @text={{@text}}
      @color="tertiary"
      @icon="chevron-down"
      aria-expanded={{if @isOpen "true" "false"}}
      class={{this.classNames}}
      ...attributes
    />
  </template>
}
