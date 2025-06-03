/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import type { HdsTextBodySignature } from '../text/body';

type HdsCodeBlockDescriptionElement = HdsTextBodySignature['Element'];
export interface HdsCodeBlockDescriptionSignature {
  Args: {
    didInsertNode?: () => void;
  };
  Blocks: {
    default: [];
  };
  Element: HdsCodeBlockDescriptionElement;
}

export default class HdsCodeBlockDescription extends Component<HdsCodeBlockDescriptionSignature> {
  private _id = 'description-' + guidFor(this);

  private _setUpDescription = modifier(
    (element: HTMLElement, [insertCallbackFunction]: [() => void]) => {
      if (typeof insertCallbackFunction === 'function') {
        insertCallbackFunction();
      }
    }
  );

  @action
  didInsertNode(): void {
    const { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function') {
      didInsertNode();
    }
  }
}
