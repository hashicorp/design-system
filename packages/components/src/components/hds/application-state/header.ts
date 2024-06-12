/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsApplicationStateHeaderSignature {
  Args: {
    title?: string;
    errorCode?: string;
    icon?: string;
  };
  Element: HTMLDivElement;
}

export default class HdsApplicationStateHeaderComponent extends Component<HdsApplicationStateHeaderSignature> {}
