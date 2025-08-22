/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { guidFor } from '@ember/object/internals';
import { EditorView } from '@codemirror/view';
import { StateEffect } from '@codemirror/state';

import HdsCodeEditorDescription from './description.ts';
import HdsCodeEditorTitle from './title.ts';

import type Owner from '@ember/owner';
import type { ViewUpdate } from '@codemirror/view';
import type { WithBoundArgs } from '@glint/template';
import type { ComponentLike } from '@glint/template';
import type { HdsCodeEditorSignature as HdsCodeEditorModifierSignature } from '../../../modifiers/hds-code-editor.ts';
import type { HdsCodeEditorDescriptionSignature } from './description';
import type { HdsCodeEditorTitleSignature } from './title';
import type { HdsCodeEditorGenericSignature } from './generic';
import type { HdsCopyButtonSignature } from '../copy/button/index.ts';

export interface HdsCodeEditorSignature {
  Args: {
    hasCopyButton?: boolean;
    hasFullScreenButton?: boolean;
    isStandalone?: boolean;
    copyButtonText?: HdsCopyButtonSignature['Args']['text'];
  } & HdsCodeEditorModifierSignature['Args']['Named'];
  Blocks: {
    default: [
      {
        Title?: WithBoundArgs<
          typeof HdsCodeEditorTitle,
          'onInsert' | 'editorId'
        >;
        Description?: WithBoundArgs<
          typeof HdsCodeEditorDescription,
          'onInsert' | 'editorId'
        >;
        Generic?: ComponentLike<HdsCodeEditorGenericSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsCodeEditor extends Component<HdsCodeEditorSignature> {
  @tracked private _isFullScreen = false;
  @tracked private _isSetupComplete = false;
  @tracked private _value;
  @tracked private _titleId: string | undefined;
  @tracked private _descriptionId: string | undefined;

  private _id = guidFor(this);

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

  constructor(owner: Owner, args: HdsCodeEditorSignature['Args']) {
    super(owner, args);

    if (args.value) {
      this._value = args.value;
    }
  }

  get ariaLabelledBy(): string | undefined {
    if (this.args.ariaLabel !== undefined) {
      return;
    }

    return this.args.ariaLabelledBy ?? this._titleId;
  }

  get ariaDescribedBy(): string | undefined {
    return this.args.ariaDescribedBy ?? this._descriptionId;
  }

  get hasActions(): boolean {
    return (this.args.hasCopyButton || this.args.hasFullScreenButton) ?? false;
  }

  get isStandalone(): boolean {
    return this.args.isStandalone ?? true;
  }

  get classNames(): string {
    // Currently there is only one theme so the class name is hard-coded.
    // In the future, additional themes such as a "light" theme could be added.
    const classes = ['hds-code-editor', 'hds-code-editor--theme-dark'];

    if (this._isFullScreen) {
      classes.push('hds-code-editor--is-full-screen');
    }

    if (this.isStandalone) {
      classes.push('hds-code-editor--is-standalone');
    }

    return classes.join(' ');
  }

  get copyButtonText(): HdsCopyButtonSignature['Args']['text'] {
    return this.args.copyButtonText ? this.args.copyButtonText : 'Copy';
  }

  @action
  registerTitleElement(element: HdsCodeEditorTitleSignature['Element']): void {
    this._titleId = element.id;
  }

  @action
  registerDescriptionElement(
    element: HdsCodeEditorDescriptionSignature['Element']
  ): void {
    this._descriptionId = element.id;
  }

  @action
  toggleFullScreen(): void {
    this._isFullScreen = !this._isFullScreen;
  }

  @action
  onInput(newValue: string, editorView: EditorView): void {
    this.args.onInput?.(newValue, editorView);
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

    const valueUpdateExtension = EditorView.updateListener.of(
      (update: ViewUpdate) => {
        this._value = update.state.doc.toString();
      }
    );

    editorView.dispatch({
      effects: StateEffect.appendConfig.of([valueUpdateExtension]),
    });

    this.args.onSetup?.(editorView);
  }
}
