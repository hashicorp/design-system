/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { HdsAlertTags } from './types';
export interface HdsAlertTitleSignature {
  Args: {
    tag?: HdsAlertTags;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

class HdsAlertTitleComponent extends Component<HdsAlertTitleSignature> {
  get componentTag(): HdsAlertTags {
    return this.args.tag ?? 'div';
  }
}

export default HdsAlertTitleComponent;
