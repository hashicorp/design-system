/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';

import HdsTextBody from '../text/body.gts';

import type { HdsTextBodySignature } from '../text/body.gts';

type HdsCodeEditorDescriptionElement = HdsTextBodySignature['Element'];
export interface HdsCodeEditorDescriptionSignature {
  Args: {
    editorId: string;
    onInsert: (element: HdsCodeEditorDescriptionElement) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HdsCodeEditorDescriptionElement;
}

export default class HdsCodeEditorDescription extends Component<HdsCodeEditorDescriptionSignature> {
  private _id = `${this.args.editorId}-description`;

  private _setUpDescription = modifier(
    (element: HdsCodeEditorDescriptionElement) => {
      this.args.onInsert(element);
    }
  );

  <template>
    <HdsTextBody
      id={{this._id}}
      class="hds-code-editor__description"
      @tag="p"
      @size="100"
      {{this._setUpDescription}}
      ...attributes
    >
      {{yield}}
    </HdsTextBody>
  </template>
}
