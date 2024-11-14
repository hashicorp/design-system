/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { HdsCodeEditorSignature as HdsCodeEditorModifierSignature } from 'src/modifiers/hds-code-editor';

export interface HdsCodeEditorSignature {
  Args: {
    canCopy?: boolean;
    canExpand?: boolean;
    description?: string;
    language?: HdsCodeEditorModifierSignature['Args']['Named']['language'];
    options?: unknown[];
    title?: string;
    value: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsCodeEditor extends Component<HdsCodeEditorSignature> {
  @tracked isFullscreen = false;

  get classNames(): string {
    const classes = ['hds-code-editor'];

    if (!this.isFullscreen) {
      classes.push('hds-code-editor--is-fullscreen');
    }

    return classes.join(' ');
  }
}
