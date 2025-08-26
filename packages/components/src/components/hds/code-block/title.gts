/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';

import HdsTextBody from '../text/body.gts';
import { HdsCodeBlockTitleTagValues } from './types.ts';

import type { HdsTextBodySignature } from '../text/body.gts';
import type { HdsCodeBlockTitleTags } from './types.ts';

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

  <template>
    <HdsTextBody
      id={{this._id}}
      @size="200"
      @tag={{this.componentTag}}
      @weight="semibold"
      class="hds-code-block__title"
      ...attributes
      {{this._setUpTitle @didInsertNode}}
    >
      {{yield}}
    </HdsTextBody>
  </template>
}
