/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { assert } from '@ember/debug';
import Modifier from 'ember-modifier';
import { dropTask } from 'ember-concurrency';

import hdsDarkTheme from './hds-code-editor/themes/hds-dark-theme.ts';
import hdsDarkHighlightStyle from './hds-code-editor/highlight-styles/hds-dark-highlight-style.ts';

import type { PositionalArgs, NamedArgs } from 'ember-modifier';
import type { EditorView, ViewUpdate } from '@codemirror/view';
import type {
  HdsCodeEditorLanguages,
  CodemirrorGoModule,
  CodemirrorJsonModule,
  CodemirrorSqlModule,
  CodemirrorHclModule,
  CodemirrorLanguageModule,
} from 'src/types/hds-code-editor.types';

export interface HdsCodeEditorSignature {
  Args: {
    Named: {
      language?: HdsCodeEditorLanguages;
      value?: string;
      onInput?: (newVal: string) => void;
      onBlur?: (editor: EditorView, event: FocusEvent) => void;
      onSetup?: (editor: EditorView) => unknown;
    };
  };
}

export default class HdsCodeEditorModifier extends Modifier<HdsCodeEditorSignature> {
  editor!: EditorView;
  element!: HTMLElement;

  onInput: HdsCodeEditorSignature['Args']['Named']['onInput'];

  observer!: IntersectionObserver;

  modify(
    element: HTMLElement,
    positional: PositionalArgs<HdsCodeEditorSignature>,
    named: NamedArgs<HdsCodeEditorSignature>
  ): void {
    assert('HdsCodeEditor must have an element', element);

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // @ts-ignore
        if (entry.isIntersecting && this.setupTask.performCount === 0) {
          // @ts-ignore
          this.setupTask.perform(element, positional, named);
        }
      });
    });

    this.observer.observe(element);
  }

  willRemove() {
    this.observer.disconnect();
  }

  @dropTask *loadLanguageTask(language?: HdsCodeEditorLanguages) {
    if (language === undefined) {
      return;
    }

    let module: CodemirrorLanguageModule | null = null;
    let languageFunction = null;

    switch (language) {
      case 'go':
        module = yield import('@codemirror/lang-go');
        languageFunction = (module as CodemirrorGoModule).go;
        break;
      case 'json':
        module = yield import('@codemirror/lang-json');
        languageFunction = (module as CodemirrorJsonModule).json;
        break;
      case 'sql':
        module = yield import('@codemirror/lang-sql');
        languageFunction = (module as CodemirrorSqlModule).sql;
        break;
      case 'hcl':
        module = yield import('codemirror-lang-hcl');
        languageFunction = (module as CodemirrorHclModule).hcl;
        break;
      default:
        throw new Error(`Language ${language} is not supported`);
    }

    return languageFunction();
  }

  @dropTask *setupTask(
    element: HTMLElement,
    _positional: PositionalArgs<HdsCodeEditorSignature>,
    named: NamedArgs<HdsCodeEditorSignature>
  ) {
    const { onInput, onSetup, language, value } = named;

    const [
      {
        EditorView,
        keymap,
        lineNumbers,
        highlightActiveLineGutter,
        highlightSpecialChars,
        highlightActiveLine,
      },
      { EditorState },
      { defaultKeymap, history, historyKeymap },
      { bracketMatching, syntaxHighlighting },
    ] = yield Promise.all([
      import('@codemirror/view'),
      import('@codemirror/state'),
      import('@codemirror/commands'),
      import('@codemirror/language'),
    ]);

    this.onInput = onInput;

    // @ts-ignore
    const languageExtension = yield this.loadLanguageTask.perform(language);

    let extensions = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      highlightActiveLine(),
      EditorView.updateListener.of((update: ViewUpdate) => {
        // toggle a class if the update has/does not have a selection
        if (update.selectionSet) {
          update.view.dom.classList.toggle(
            'cm-hasSelection',
            !update.state.selection.main.empty
          );
        }

        // call the onInput callback if the document has changed
        if (!update.docChanged || this.onInput === undefined) {
          return;
        }
        this.onInput(update.state.doc.toString());
      }),
      hdsDarkTheme,
      keymap.of([...defaultKeymap, ...historyKeymap]),
      bracketMatching(),
      syntaxHighlighting(hdsDarkHighlightStyle),
      history(),
    ];

    if (languageExtension !== undefined) {
      extensions = [languageExtension, ...extensions];
    }

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    const editor = new EditorView({ state, parent: element });

    this.editor = editor;
    this.element = element;

    onSetup?.(editor);
  }
}
