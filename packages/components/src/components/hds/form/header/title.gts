/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { HdsFormHeaderTitleTagValues } from '../types.ts';
import { HdsTextSizeValues } from '../../text/types.ts';
import HdsTextDisplay from '../../text/display.gts';

import type { HdsFormHeaderTitleTags } from '../types.ts';
import type { HdsTextDisplaySignature } from '../../text/display.gts';

export const DEFAULT_SIZE = HdsTextSizeValues.FourHundred;
export const DEFAULT_TAG = HdsFormHeaderTitleTagValues.Div;
export const TAGS: HdsFormHeaderTitleTags[] = Object.values(
  HdsFormHeaderTitleTagValues
);

export interface HdsFormHeaderTitleSignature {
  Args: {
    tag?: HdsFormHeaderTitleTags;
    size?: HdsTextDisplaySignature['Args']['size'];
  };
  Blocks: {
    default: [];
  };
  Element: HdsTextDisplaySignature['Element'];
}

export default class HdsFormHeaderTitle extends Component<HdsFormHeaderTitleSignature> {
  get tag(): HdsFormHeaderTitleTags {
    const { tag = DEFAULT_TAG } = this.args;

    assert(
      `@tag for "Hds::Form::Header::Title" must be one of the following: ${TAGS.join(
        ', '
      )}; received: ${tag}`,
      TAGS.includes(tag)
    );

    return tag;
  }

  get size(): HdsTextDisplaySignature['Args']['size'] {
    return this.args.size ?? DEFAULT_SIZE;
  }

  <template>
    <HdsTextDisplay
      class="hds-form__header-title"
      @tag={{this.tag}}
      @size={{this.size}}
      @color="strong"
      ...attributes
    >
      {{yield}}
    </HdsTextDisplay>
  </template>
}
