/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { FloatingUIOptions } from '../../../modifiers/hds-anchored-position';

export interface HdsBreadcrumbTruncationSignature {
  Args: {
    ariaLabel?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

export default class HdsBreadcrumbTruncation extends Component<HdsBreadcrumbTruncationSignature> {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'show more'
   */
  get ariaLabel(): string {
    return this.args.ariaLabel ?? 'show more';
  }

  anchoredPositionOptions: FloatingUIOptions = {
    placement: 'bottom-start',
    offsetOptions: 4,
  };
}
