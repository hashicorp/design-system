/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsCodeEditorSignature {
  Args: {
    title?: string;
    description?: string;
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
