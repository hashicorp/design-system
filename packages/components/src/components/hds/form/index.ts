/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { HdsFormTagValues } from './types.ts';

import type { HdsFormTags } from './types.ts';
import type Owner from '@ember/owner';

export const DEFAULT_TAG = HdsFormTagValues.Form;

export const AVAILABLE_TAGS: string[] = Object.values(HdsFormTagValues);

export interface HdsFormSignature {
  Args: {
    tag?: HdsFormTags;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLFormElement | HTMLDivElement;
}

export default class HdsForm extends Component<HdsFormSignature> {
  tag: HdsFormTags;

  constructor(owner: Owner, args: HdsFormSignature['Args']) {
    super(owner, args);
    this.tag = args.tag ?? DEFAULT_TAG;

    assert(
      `@tag for "Hds::Form" must be one of the following: ${AVAILABLE_TAGS.join(', ')}; received: ${this.tag}`,
      AVAILABLE_TAGS.includes(this.tag)
    );
  }
}
