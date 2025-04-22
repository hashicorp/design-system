/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { guidFor } from '@ember/object/internals';
// @ts-expect-error: missing types
import focusTrap from 'ember-focus-trap/modifiers/focus-trap';

import HdsCodeEditorDescription from './description.ts';
import HdsCodeEditorTitle from './title.ts';

import type { WithBoundArgs } from '@glint/template';
import type Owner from '@ember/owner';
import type { ComponentLike } from '@glint/template';
import type { HdsCodeEditorSignature as HdsCodeEditorModifierSignature } from '../../../modifiers/hds-code-editor.ts';
import type { HdsCodeEditorDescriptionSignature } from './description.gts';
import type { HdsCodeEditorTitleSignature } from './title.gts';
import type { HdsCodeEditorGenericSignature } from './generic.gts';
import type { EditorView } from '@codemirror/view';
import type { HdsCopyButtonSignature } from '../copy/button/index.gts';
import { hash } from '@ember/helper';
import { or } from 'ember-truth-helpers';
import HdsIcon from '../icon/index.gts';
import hdsCodeEditor from '../../../modifiers/hds-code-editor.ts';
import HdsCodeEditorFullScreenButton from './full-screen-button.gts';
import HdsCopyButton from '../copy/button/index.gts';
import HdsCodeEditorGeneric from './generic.gts';
import HdsCodeEditorDescription from './description.gts';
import HdsCodeEditorTitle from './title.gts';

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
    this._value = newValue;
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
    this.args.onSetup?.(editorView);
  }

  <template>
    <div
      id={{this._id}}
      class={{this.classNames}}
      {{focusTrap isActive=this._isFullScreen}}
      {{this._handleEscape}}
      ...attributes
    >
      {{! header }}
      {{#if (or this.hasActions (has-block))}}
        <div class="hds-code-editor__header">
          <div class="hds-code-editor__header-content">
            {{yield
              (hash
                Title=(component
                  HdsCodeEditorTitle
                  editorId=this._id
                  onInsert=this.registerTitleElement
                )
                Description=(component
                  HdsCodeEditorDescription
                  editorId=this._id
                  onInsert=this.registerDescriptionElement
                )
                Generic=HdsCodeEditorGeneric
              )
            }}
          </div>

          {{#if this.hasActions}}
            <div class="hds-code-editor__header-actions">
              {{#if @hasCopyButton}}
                <HdsCopyButton
                  class="hds-code-editor__button hds-code-editor__copy-button"
                  @isIconOnly={{true}}
                  @size="small"
                  @text={{this.copyButtonText}}
                  @textToCopy={{this._value}}
                />
              {{/if}}
              {{#if @hasFullScreenButton}}
                <HdsCodeEditorFullScreenButton
                  @isFullScreen={{this._isFullScreen}}
                  @onToggleFullScreen={{this.toggleFullScreen}}
                />
              {{/if}}
            </div>
          {{/if}}
        </div>
      {{/if}}

      {{! editor }}
      <div
        class="hds-code-editor__editor"
        {{hdsCodeEditor
          ariaDescribedBy=this.ariaDescribedBy
          ariaLabel=@ariaLabel
          ariaLabelledBy=this.ariaLabelledBy
          extraKeys=@extraKeys
          hasLineWrapping=@hasLineWrapping
          isLintingEnabled=@isLintingEnabled
          language=@language
          value=@value
          onBlur=@onBlur
          onInput=this.onInput
          onSetup=this.onSetup
          onLint=@onLint
        }}
      />

      {{! loader }}
      {{#unless this._isSetupComplete}}
        <div class="hds-code-editor__loader" aria-live="polite" role="status">
          <HdsIcon @name="loading" @size="24" />
          <span class="sr-only">Loading</span>
        </div>
      {{/unless}}
    </div>
  </template>
}
