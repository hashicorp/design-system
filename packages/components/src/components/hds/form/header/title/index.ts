/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsTextSizeValues } from '../../../text/types.ts';

import type { HdsTextTags, HdsTextSizes } from '../../../text/types.ts';

export const DEFAULT_SIZE = HdsTextSizeValues.FourHundred;
export const DEFAULT_TAG = 'div';
export const AVAILABLE_TAGS = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

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
    const { tag = DEFAULT_TAG } = this.args;

    assert(
      `@tag for "Hds::Form::Header::Title" must be one of the following: ${AVAILABLE_TAGS.join(
        ', '
      )}; received: ${tag}`,
      AVAILABLE_TAGS.includes(tag)
    );

    return tag;
  }

  get size(): HdsTextSizes {
    return this.args.size ?? DEFAULT_SIZE;
  }
}
