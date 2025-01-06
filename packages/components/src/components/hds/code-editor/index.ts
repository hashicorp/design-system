/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';

import type { ComponentLike } from '@glint/template';
import type { HdsCodeEditorSignature as HdsCodeEditorModifierSignature } from 'src/modifiers/hds-code-editor';
import type { HdsButtonSignature } from 'src/components/hds/button';
import type { HdsCodeEditorDescriptionSignature } from './description';
import type { HdsCodeEditorTitleSignature } from './title';
import type { EditorView } from '@codemirror/view';

export interface HdsCodeEditorSignature {
  Args: {
    hasCopyButton?: boolean;
    hasFullScreenButton?: boolean;
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
  @tracked private _isFullScreen = false;
  @tracked private _isSetupComplete = false;
  @tracked private _value;

  private _handleEscape = modifier(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !this._isFullScreen) {
        return;
      }

      this.toggleFullScreen();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  constructor(owner: unknown, args: HdsCodeEditorSignature['Args']) {
    super(owner, args);

    if (args.value) {
      this._value = args.value;
    }
  }

  get classNames(): string {
    // Currently there is only one theme so the class name is hard-coded.
    // In the future, additional themes such as a "light" theme could be added.
    const classes = ['hds-code-editor', 'hds-code-editor--theme-dark'];

    if (this._isFullScreen) {
      classes.push('hds-code-editor--is-full-screen');
    }

    return classes.join(' ');
  }

  get hasActions(): boolean {
    return (this.args.hasCopyButton || this.args.hasFullScreenButton) ?? false;
  }

  @action
  toggleFullScreen(): void {
    this._isFullScreen = !this._isFullScreen;
  }

  @action
  onInput(newValue: string): void {
    this._value = newValue;
    this.args.onInput?.(newValue);
  }

  @action
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this._isFullScreen) {
      this.toggleFullScreen();
    }
  }

  @action
  onSetup(editorView: EditorView): void {
    this._isSetupComplete = true;
    this.args.onSetup?.(editorView);
  }
}
