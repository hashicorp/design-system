/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';

import HdsTextBody from '../text/body.gts';
import { HdsCodeBlockTitleTagValues } from './types.ts';

import type { HdsCodeBlockTitleTags } from './types.ts';
import type { HdsTextBodySignature } from '../text/body.gts';

export interface HdsCodeBlockTitleSignature {
  Args: {
    tag?: HdsCodeBlockTitleTags;
  };
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

export default class HdsCodeBlockTitle extends Component<HdsCodeBlockTitleSignature> {
  get componentTag(): HdsCodeBlockTitleTags {
    return this.args.tag ?? HdsCodeBlockTitleTagValues.P;
  }

  <template>
    <HdsTextBody
      @size="200"
      @tag={{this.componentTag}}
      @weight="semibold"
      class="hds-code-block__title"
      ...attributes
    >
      {{yield}}
    </HdsTextBody>
  </template>
}
