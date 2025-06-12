/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import type { HdsFormHeaderTags } from '../../types.ts';
import { HdsFormHeaderTagValues } from '../../types.ts';

import type { HdsTextSizes } from '../../../text/types.ts';
import { HdsTextSizeValues } from '../../../text/types.ts';
import type { HdsTextDisplaySignature } from '../../../text/display.ts';

export const DEFAULT_SIZE = HdsTextSizeValues.FourHundred;
export const DEFAULT_TAG = HdsFormHeaderTagValues.Div;
export const AVAILABLE_TAGS: string[] = Object.values(HdsFormHeaderTagValues);

export interface HdsFormHeaderTitleSignature {
  Args: {
    tag?: HdsFormHeaderTags;
    size?: HdsTextDisplaySignature['Args']['size'];
  };
  Blocks: {
    default: [];
  };
  Element: HdsTextDisplaySignature['Element'];
}

export default class HdsFormHeaderTitle extends Component<HdsFormHeaderTitleSignature> {
  get tag(): HdsFormHeaderTags {
    const { tag = DEFAULT_TAG } = this.args;

    assert(
      `@tag for "Hds::Form::Header::Title" must be one of the following: ${AVAILABLE_TAGS.join(
        ', '
      )}; received: ${tag}`,
      AVAILABLE_TAGS.includes(tag)
    );

    return tag;
  }

  get size(): HdsTextDisplaySignature['Args']['size'] {
    return this.args.size ?? DEFAULT_SIZE;
  }
}
