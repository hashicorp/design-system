/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsLinkStandaloneSignature } from '../link/standalone';

export interface HdsApplicationStateFooterSignature {
  Args: {
    hasDivider?: boolean;
  };
  Blocks: {
    default?: [
      {
        LinkStandalone?: ComponentLike<HdsLinkStandaloneSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsApplicationStateFooterComponent extends Component<HdsApplicationStateFooterSignature> {
  /**
   * Indicate if the footer should have a top border or not.
   *
   * @param hasDivider
   * @type {boolean}
   * @default false
   */
  get hasDivider(): boolean {
    return this.args.hasDivider ?? false;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-application-state__footer'];

    // add a class based on the existence of @hasDivider argument
    if (this.hasDivider) {
      classes.push(`hds-application-state__footer--has-divider`);
    }

    return classes.join(' ');
  }
}
