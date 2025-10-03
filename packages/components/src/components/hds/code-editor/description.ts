/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';

import type { HdsTextBodySignature } from '../text/body';

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

  private _callOnInsert = modifier(
    (element: HdsCodeEditorDescriptionElement) => {
      const { onInsert } = this.args;

      if (typeof onInsert === 'function') {
        onInsert(element);
      }
    }
  );
}
