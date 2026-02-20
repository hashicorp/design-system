/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';

import HdsTextBody from '../text/body.gts';

import type { HdsTextBodySignature } from '../text/body.gts';

type HdsCodeBlockDescriptionElement = HdsTextBodySignature['Element'];
export interface HdsCodeBlockDescriptionSignature {
  Args: {
    didInsertNode: (element: HdsCodeBlockDescriptionElement) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HdsCodeBlockDescriptionElement;
}

export default class HdsCodeBlockDescription extends Component<HdsCodeBlockDescriptionSignature> {
  private _id = 'description-' + guidFor(this);

  private _setUpDescription = modifier(
    (
      element: HTMLElement,
      [insertCallbackFunction]: [(element: HTMLElement) => void]
    ) => {
      if (typeof insertCallbackFunction === 'function') {
        insertCallbackFunction(element);
      }
    }
  );

  <template>
    <HdsTextBody
      id={{this._id}}
      @tag="p"
      @size="100"
      class="hds-code-block__description"
      ...attributes
      {{this._setUpDescription @didInsertNode}}
    >
      {{yield}}
    </HdsTextBody>
  </template>
}
