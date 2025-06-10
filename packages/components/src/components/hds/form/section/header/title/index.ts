/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsTextSizeValues } from '../../../../text/types.ts';

import type { HdsFormHeaderTag } from '../../../types.ts';
import { HdsFormHeaderTagValues } from '../../../types.ts';

import type { HdsTextSizes } from '../../../../text/types.ts';

export const DEFAULT_SIZE = HdsTextSizeValues.ThreeHundred;
export const DEFAULT_TAG = HdsFormHeaderTagValues.Div;
export const AVAILABLE_TAGS: string[] = Object.values(HdsFormHeaderTagValues);

export interface HdsFormSectionHeaderTitleSignature {
  Args: {
    tag?: HdsFormHeaderTag;
    size?: HdsTextSizes;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLHeadingElement | HTMLDivElement;
}

export default class HdsFormSectionHeaderTitle extends Component<HdsFormSectionHeaderTitleSignature> {
  get tag(): HdsFormHeaderTag {
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
