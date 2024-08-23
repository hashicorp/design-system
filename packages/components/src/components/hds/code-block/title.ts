/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsCodeBlockTitleTagValues } from './types.ts';
import type { HdsCodeBlockTitleTags } from './types';
import type { HdsTextBodySignature } from '../text/body';

export interface HdsCodeBlockTitleSignature {
  Args: {
    tag?: HdsCodeBlockTitleTags;
  };
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

class HdsCodeBlockTitleComponent extends Component<HdsCodeBlockTitleSignature> {
  get componentTag(): HdsCodeBlockTitleTags {
    return this.args.tag ?? HdsCodeBlockTitleTagValues.P;
  }
}

export default HdsCodeBlockTitleComponent;
