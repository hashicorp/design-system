/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

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

  <template>
    <HdsTextBody
      id={{this._id}}
      class="hds-code-editor__description"
      @tag="p"
      @size="100"
      {{didInsert @onInsert}}
      ...attributes
    >
      {{yield}}
    </HdsTextBody>
  </template>
}
