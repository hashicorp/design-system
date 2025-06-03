/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { HdsCodeBlockTitleTagValues } from './types.ts';
import type { HdsCodeBlockTitleTags } from './types';
import type { HdsTextBodySignature } from '../text/body';

type HdsCodeBlockTitleElement = HdsTextBodySignature['Element'];
export interface HdsCodeBlockTitleSignature {
  Args: {
    tag?: HdsCodeBlockTitleTags;
    didInsertNode?: () => void;
  };
  Blocks: {
    default: [];
  };
  Element: HdsCodeBlockTitleElement;
}

export default class HdsCodeBlockTitle extends Component<HdsCodeBlockTitleSignature> {
  private _id = 'title-' + guidFor(this);

  private _setUpTitle = modifier(
    (element: HTMLElement, [insertCallbackFunction]: [() => void]) => {
      if (typeof insertCallbackFunction === 'function') {
        insertCallbackFunction();
      }
    }
  );

  get componentTag(): HdsCodeBlockTitleTags {
    return this.args.tag ?? HdsCodeBlockTitleTagValues.P;
  }

  @action
  didInsertNode(): void {
    const { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function') {
      didInsertNode();
    }
  }
}
