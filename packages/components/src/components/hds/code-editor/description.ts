/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { HdsTextBodySignature } from '../text/body';

type HdsCodeEditorDescriptionElement = HdsTextBodySignature['Element'];
export interface HdsCodeEditorDescriptionSignature {
  Args: {
    editorId: string;
    tag?: HdsTextBodySignature['Args']['tag'];
    onInsert: (element: HdsCodeEditorDescriptionElement) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HdsCodeEditorDescriptionElement;
}

export default class HdsCodeEditorDescription extends Component<HdsCodeEditorDescriptionSignature> {
  private _id = `${this.args.editorId}-title`;
}
