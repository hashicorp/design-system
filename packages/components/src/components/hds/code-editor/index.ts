/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { HdsCodeEditorSignature as HdsCodeEditorModifierSignature } from 'src/modifiers/hds-code-editor';

export interface HdsCodeEditorSignature {
  Args: {
    title?: string;
    description?: string;
    language?: HdsCodeEditorModifierSignature['Args']['Named']['language'];
    value: string;
    options?: unknown[];
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsCodeEditor extends Component<HdsCodeEditorSignature> {
  get classNames(): string {
    const classes = ['hds-code-editor'];

    return classes.join(' ');
  }
}
