/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';

interface IndexSignature {
 Args: {
  isOpen: unknown;
  text: unknown;
  textWhenOpen: unknown;
 };
 Blocks: {
  default: [];
 };
 Element: HTMLElement;
}

export default class IndexComponent extends Component<IndexSignature> {
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
    let { text } = this.args;

    assert(
      '@text for "Hds::Reveal" must have a valid value',
      text !== undefined
    );

    return text;
  }
}

declare module '@glint/environment-ember-loose/registry' {
 export default interface Registry {
  'Index': typeof IndexComponent;
  'index': typeof IndexComponent;
 }
}
