/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import type { ComponentLike } from '@glint/template';
import type { HdsCodeEditorSignature as HdsCodeEditorModifierSignature } from 'src/modifiers/hds-code-editor';
import type { HdsButtonSignature } from 'src/components/hds/button';
import type { HdsCodeEditorDescriptionSignature } from './description';
import type { HdsCodeEditorTitleSignature } from './title';
import type { EditorView } from '@codemirror/view';

export interface HdsCodeEditorSignature {
  Args: {
    hasCopyButton?: boolean;
    hasExpandButton?: boolean;
    language?: HdsCodeEditorModifierSignature['Args']['Named']['language'];
    value?: HdsCodeEditorModifierSignature['Args']['Named']['value'];
    onInput?: HdsCodeEditorModifierSignature['Args']['Named']['onInput'];
    onSetup?: HdsCodeEditorModifierSignature['Args']['Named']['onSetup'];
  };
  Blocks: {
    default: [
      {
        Title?: ComponentLike<HdsCodeEditorTitleSignature>;
        Description?: ComponentLike<HdsCodeEditorDescriptionSignature>;
        Button?: ComponentLike<HdsButtonSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsCodeEditor extends Component<HdsCodeEditorSignature> {
  @tracked isFullscreen = false;
  @tracked isSetupComplete = false;

  get classNames(): string {
    // Currently there is only one theme so the class name is hard-coded.
    // In the future, additional themes such as a "light" theme could be added.
    const classes = ['hds-code-editor', 'hds-code-editor--theme-dark'];

    if (this.isFullscreen) {
      classes.push('hds-code-editor--is-fullscreen');
    }

    return classes.join(' ');
  }

  get hasToolbarButton(): boolean {
    return (this.args.hasCopyButton || this.args.hasExpandButton) ?? false;
  }

  @action
  onSetup(editorView: EditorView): void {
    this.isSetupComplete = true;
    this.args.onSetup?.(editorView);
  }

  @action
  toggleFullscreen(): void {
    this.isFullscreen = !this.isFullscreen;
  }
}
