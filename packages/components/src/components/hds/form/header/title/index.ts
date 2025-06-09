/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import { HdsTextSizeValues } from '../../../text/types.ts';

import type { HdsTextTags, HdsTextSizes } from '../../../text/types.ts';

export const DEFAULT_SIZE = HdsTextSizeValues.FourHundred;

export interface HdsFormHeaderTitleSignature {
  Args: {
    tag?: HdsTextTags;
    size?: HdsTextSizes;
  };
  Blocks: {
    default: [];
  };
  Element:
    | HTMLSpanElement
    | HTMLHeadingElement
    | HTMLParagraphElement
    | HTMLDivElement;
}

export default class HdsFormHeaderTitle extends Component<HdsFormHeaderTitleSignature> {
  get tag(): HdsTextTags {
    return this.args.tag ?? 'div';
  }

  get size(): HdsTextSizes {
    return this.args.size ?? DEFAULT_SIZE;
  }
}
