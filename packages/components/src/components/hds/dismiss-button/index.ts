/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsDismissButtonSignature {
  Args: {
    ariaLabel?: string;
  },
  Element: HTMLButtonElement;
}

export default class HdsDismissButtonIndexComponent extends Component<HdsDismissButtonSignature> {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Dismiss'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'Dismiss';
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Hds::DismissButton': typeof HdsDismissButtonIndexComponent;
    'hds/dismiss-button': typeof HdsDismissButtonIndexComponent;
    'HdsDismissButton': typeof HdsDismissButtonIndexComponent;
  }
}
