/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { HdsTextBodySignature } from '../text/body';

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
}
