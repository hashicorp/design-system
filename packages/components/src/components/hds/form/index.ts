/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { HdsFormTagValues } from './types.ts';

import type { HdsFormTag } from './types.ts';

export const DEFAULT_TAG = HdsFormTagValues.Form;

export const AVAILABLE_TAGS: string[] = Object.values(HdsFormTagValues);

export interface HdsFormSignature {
  // The arguments accepted by the component
  Args: {
    tag?: HdsFormTag;
  };
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: HTMLElement;
}
// More info on types and signatures: https://hashicorp.atlassian.net/wiki/spaces/HDS/pages/3245932580/Using+Typescript

export default class HdsForm extends Component<HdsFormSignature> {
  get componentTag(): HdsFormTag {
    const { tag = DEFAULT_TAG } = this.args;

    assert(
      `@tag for "Hds::Form" must be one of the following: ${AVAILABLE_TAGS.join(', ')}; received: ${tag}`,
      AVAILABLE_TAGS.includes(tag)
    );

    return tag;
  }
}
