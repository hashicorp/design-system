/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { assert, warn } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import Modifier from 'ember-modifier';
import { task } from 'ember-concurrency';
import config from 'ember-get-config';

import hdsDarkTheme from './hds-code-editor/themes/hds-dark-theme.ts';
import hdsDarkHighlightStyle from './hds-code-editor/highlight-styles/hds-dark-highlight-style.ts';

import type { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import type { EditorView, ViewUpdate } from '@codemirror/view';
import {
  type HdsCodeEditorLanguages,
  type HdsCodeEditorLanguageFunction,
  type CodemirrorGoModule,
  type CodemirrorJsonModule,
  type CodemirrorSqlModule,
  type CodemirrorHclModule,
  type CodemirrorLanguageModule,
} from '../types/hds-code-editor.types.ts';

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

const LOADER_HEIGHT = '164px';

const LANGUAGES = ['json', 'sql', 'go', 'hcl'] as HdsCodeEditorLanguages[];

export default class HdsCodeEditorModifier extends Modifier<HdsCodeEditorSignature> {
  editor!: EditorView;
  element!: HTMLElement;

  onInput: HdsCodeEditorSignature['Args']['Named']['onInput'];

  observer!: IntersectionObserver;

  constructor(
    owner: HdsCodeEditorModifier,
    args: ArgsFor<HdsCodeEditorSignature>
  ) {
    super(owner, args);

    registerDestructor(this, () => this.observer?.disconnect());
  }

  modify(
    element: HTMLElement,
    positional: PositionalArgs<HdsCodeEditorSignature>,
    named: NamedArgs<HdsCodeEditorSignature>
  ): void {
    assert('HdsCodeEditor must have an element', element !== undefined);
    // the intersection observer makes loading unreliable in tests
    if (config.environment === 'test') {
      this.setupTask.perform(element, positional, named);
    } else {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && this.setupTask.performCount === 0) {
              this.setupTask.perform(element, positional, named);
            }
          });
        },
        {
          rootMargin: LOADER_HEIGHT,
        }
      );

      this.observer.observe(element);
    }
  }

  loadLanguageTask = task(
    { drop: true },
    async (language?: HdsCodeEditorLanguages) => {
      if (language === undefined) {
        return;
      }

      assert(
        `@language for "hds-code-editor" must be one of the following: ${LANGUAGES.join(
          ', '
        )}; received: ${language}`,
        LANGUAGES.includes(language)
      );

      let module: CodemirrorLanguageModule | null = null;
      let languageFunction: HdsCodeEditorLanguageFunction | null = null;

      try {
        switch (language) {
          case 'go':
            module = await import('@codemirror/lang-go');
            languageFunction = (module as CodemirrorGoModule).go;
            break;
          case 'json':
            module = await import('@codemirror/lang-json');
            languageFunction = (module as CodemirrorJsonModule).json;
            break;
          case 'sql':
            module = await import('@codemirror/lang-sql');
            languageFunction = (module as CodemirrorSqlModule).sql;
            break;
          case 'hcl':
            module = await import('codemirror-lang-hcl');
            languageFunction = (module as CodemirrorHclModule).hcl;
            break;
        }
      } catch (error) {
        warn(
          `\`hds-code-editor\` modifier - Failed to dynamically import the CodeMirror language module for '${language}'. Error: ${JSON.stringify(error)}`,
          {
            id: 'hds-code-editor.load-language-task.import-failed',
          }
        );
      }

      return languageFunction?.();
    }
  );

  buildExtensionsTask = task({ drop: true }, async ({ language }) => {
    const [
      {
        EditorView,
        keymap,
        lineNumbers,
        highlightActiveLineGutter,
        highlightSpecialChars,
        highlightActiveLine,
      },
      { defaultKeymap, history, historyKeymap },
      { bracketMatching, syntaxHighlighting },
    ] = await Promise.all([
      import('@codemirror/view'),
      import('@codemirror/commands'),
      import('@codemirror/language'),
    ]);

    const languageExtension = await this.loadLanguageTask.perform(language);

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

    return extensions;
  });

  setupTask = task(
    { drop: true },
    async (
      element: HTMLElement,
      _positional: PositionalArgs<HdsCodeEditorSignature>,
      named: NamedArgs<HdsCodeEditorSignature>
    ) => {
      const { onInput, onSetup, language, value } = named;

      this.element = element;
      this.onInput = onInput;

      try {
        const { EditorState } = await import('@codemirror/state');
        const { EditorView } = await import('@codemirror/view');

        const extensions = await this.buildExtensionsTask.perform({ language });

        const state = EditorState.create({
          doc: value,
          extensions,
        });

        const editor = new EditorView({ state, parent: element });

        this.editor = editor;

        onSetup?.(this.editor);
      } catch (error) {
        console.error(
          `\`hds-code-editor\` modifier - Failed to setup the CodeMirror editor. Error: ${JSON.stringify(error)}`
        );
      }
    }
  );
}
