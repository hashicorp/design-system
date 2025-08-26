/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

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
      {{didInsert @onInsert}}
      ...attributes
    >
      {{yield}}
    </HdsTextBody>
  </template>
}
