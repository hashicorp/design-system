/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { HdsAlertTitleTagValues } from './types.ts';
import type { HdsAlertTitleTags } from './types';
export interface HdsAlertTitleSignature {
  Args: {
    tag?: HdsAlertTitleTags;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

class HdsAlertTitleComponent extends Component<HdsAlertTitleSignature> {
  get componentTag(): HdsAlertTitleTags {
    return this.args.tag ?? HdsAlertTitleTagValues.Div;
  }
}

export default HdsAlertTitleComponent;
