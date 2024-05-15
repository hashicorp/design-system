/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';

import type { HdsDisclosurePrimitiveSignature } from '../disclosure-primitive';
import type { HdsRevealToggleButtonSignature } from './toggle/button';

interface HdsRevealSignature {
  Args: {
    text: HdsRevealToggleButtonSignature['Args']['text'];
    textWhenOpen?: HdsRevealToggleButtonSignature['Args']['text'];
    isOpen?: HdsRevealToggleButtonSignature['Args']['isOpen'];
  };
  Blocks: {
    default: [];
  };
  Element: HdsDisclosurePrimitiveSignature['Element'];
}

export default class HdsRevealComponent extends Component<HdsRevealSignature> {
  /**
   * Generates a unique ID for the Content
   *
   * @param contentId
   */
  contentId = 'content-' + guidFor(this);

  /**
   * @param text
   * @type {string}
   * @description The text of the button.
   */
  get text() {
    const { text } = this.args;

    assert(
      '@text for "Hds::Reveal" must have a valid value',
      text !== undefined
    );

    return text;
  }
}
