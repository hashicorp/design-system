/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface YieldComponentSignature {
  Blocks: {
    default: [];
  };
}

export default class HdsYieldComponent extends Component<YieldComponentSignature> {}
