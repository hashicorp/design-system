/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';
import { HdsCodeBlockTitleTagValues } from './types.ts';
import type { HdsCodeBlockTitleTags } from './types';
import type { HdsTextBodySignature } from '../text/body';

type HdsCodeBlockTitleElement = HdsTextBodySignature['Element'];
export interface HdsCodeBlockTitleSignature {
  Args: {
    tag?: HdsCodeBlockTitleTags;
    didInsertNode: (element: HdsCodeBlockTitleElement) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

export default class HdsCodeBlockTitle extends Component<HdsCodeBlockTitleSignature> {
  private _id = 'title-' + guidFor(this);

  private _setUpTitle = modifier(
    (
      element: HTMLElement,
      [insertCallbackFunction]: [(element: HTMLElement) => void]
    ) => {
      if (typeof insertCallbackFunction === 'function') {
        insertCallbackFunction(element);
      }
    }
  );

  get componentTag(): HdsCodeBlockTitleTags {
    return this.args.tag ?? HdsCodeBlockTitleTagValues.P;
  }
}
