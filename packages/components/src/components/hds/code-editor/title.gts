/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';

import HdsTextBody from '../text/body.gts';

import type { HdsTextBodySignature } from '../text/body.gts';

type HdsCodeEditorTitleElement = HdsTextBodySignature['Element'];

export interface HdsCodeEditorTitleSignature {
  Args: {
    editorId: string;
    tag?: HdsTextBodySignature['Args']['tag'];
    onInsert: (element: HdsCodeEditorTitleElement) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HdsCodeEditorTitleElement;
}

export default class HdsCodeEditorTitle extends Component<HdsCodeEditorTitleSignature> {
  private _id = `${this.args.editorId}-title`;

  private _setUpTitle = modifier((element: HdsCodeEditorTitleElement) => {
    this.args.onInsert(element);
  });

  get tag(): HdsTextBodySignature['Args']['tag'] {
    return this.args.tag ?? 'h2';
  }

  <template>
    <HdsTextBody
      id={{this._id}}
      class="hds-code-editor__title"
      @tag={{this.tag}}
      @size="200"
      @weight="semibold"
      {{this._setUpTitle}}
      ...attributes
    >
      {{yield}}
    </HdsTextBody>
  </template>
}
