/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import HdsIcon from '../icon/index.gts';

export interface HdsDismissButtonSignature {
  Args: {
    ariaLabel?: string;
  };
  Element: HTMLButtonElement;
}

export default class HdsDismissButton extends Component<HdsDismissButtonSignature> {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Dismiss'
   */
  get ariaLabel(): string {
    return this.args.ariaLabel ?? 'Dismiss';
  }

  <template>
    <button
      class="hds-dismiss-button"
      type="button"
      aria-label={{this.ariaLabel}}
      ...attributes
    >
      <HdsIcon @name="x" @size="16" />
    </button>
  </template>
}
