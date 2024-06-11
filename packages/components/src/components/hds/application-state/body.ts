/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsApplicationStateBodySignature {
  Args: {
    text?: string;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsApplicationStateBodyComponent extends Component<HdsApplicationStateBodySignature> {}
