/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Modifier from 'ember-modifier';
import { assert, warn } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { task } from 'ember-concurrency';
import config from 'ember-get-config';

// hds-dark theme
import hdsDarkTheme from './hds-code-editor/themes/hds-dark-theme.ts';
import hdsDarkHighlightStyle from './hds-code-editor/highlight-styles/hds-dark-highlight-style.ts';

import type { HdsCodeEditorLanguages } from './hds-code-editor/types.ts';
import type { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import type {
  StreamLanguage as StreamLanguageType,
  StreamParser as StreamParserType,
} from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import type { EditorView, ViewUpdate } from '@codemirror/view';

export interface HdsCodeEditorSignature {
  Args: {
    Named: {
      ariaLabel?: string;
      ariaLabelledBy?: string;
      language?: HdsCodeEditorLanguages;
      value?: string;
      onInput?: (newVal: string) => void;
      onBlur?: (editor: EditorView, event: FocusEvent) => void;
      onSetup?: (editor: EditorView) => unknown;
    };
  };
}

async function defineStreamLanguage(streamParser: StreamParserType<unknown>) {
  const { StreamLanguage } = await import('@codemirror/language');

  return StreamLanguage.define(streamParser);
}

const LOADER_HEIGHT = '164px';

const LANGUAGES: Record<
  HdsCodeEditorLanguages,
  { load: () => Promise<Extension | StreamLanguageType<unknown>> }
> = {
  ruby: {
    load: async () => {
      const { ruby } = await import('@codemirror/legacy-modes/mode/ruby');
      return defineStreamLanguage(ruby);
    },
  },
  shell: {
    load: async () => {
      const { shell } = await import('@codemirror/legacy-modes/mode/shell');
      return defineStreamLanguage(shell);
    },
  },
  go: {
    load: async () => (await import('@codemirror/lang-go')).go(),
  },
  hcl: {
    load: async () => (await import('codemirror-lang-hcl')).hcl(),
  },
  json: {
    load: async () => (await import('@codemirror/lang-json')).json(),
  },
  sql: {
    load: async () => (await import('@codemirror/lang-sql')).sql(),
  },
  yaml: {
    load: async () => (await import('@codemirror/lang-yaml')).yaml(),
  },
} as const;

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
    // the intersection observer makes loading unreliable in tests
    if (config.environment === 'test') {
      this._setupTask.perform(element, positional, named);
    } else {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const setupHasNotRun = this._setupTask.performCount === 0;

            if (entry.isIntersecting && setupHasNotRun) {
              this._setupTask.perform(element, positional, named);
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

  private _setupEditorAriaAttributes(
    editor: EditorView,
    {
      ariaLabel,
      ariaLabelledBy,
    }: Pick<
      HdsCodeEditorSignature['Args']['Named'],
      'ariaLabel' | 'ariaLabelledBy'
    >
  ) {
    assert(
      '`hds-code-editor` modifier - Either `ariaLabel` or `ariaLabelledBy` must be provided',
      ariaLabel !== undefined || ariaLabelledBy !== undefined
    );

    if (ariaLabel !== undefined) {
      editor.dom.setAttribute('aria-label', ariaLabel);
    } else if (ariaLabelledBy !== undefined) {
      editor.dom.setAttribute('aria-labelledby', ariaLabelledBy);
    }
  }

  private _loadLanguageTask = task(
    { drop: true },
    async (language?: HdsCodeEditorLanguages) => {
      if (language === undefined) {
        return;
      }

      try {
        const validLanguageKeys = Object.keys(LANGUAGES);

        assert(
          `\`hds-code-editor\` modifier - \`language\` must be one of the following: ${validLanguageKeys.join(
            ', '
          )}; received: ${language}`,
          validLanguageKeys.includes(language)
        );

        return LANGUAGES[language].load();
      } catch (error) {
        warn(
          `\`hds-code-editor\` modifier - Failed to dynamically import the CodeMirror language module for '${language}'. Error: ${JSON.stringify(
            error
          )}`,
          {
            id: 'hds-code-editor.load-language-task.import-failed',
          }
        );
      }
    }
  );

  private _buildExtensionsTask = task({ drop: true }, async ({ language }) => {
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

    const languageExtension = await this._loadLanguageTask.perform(language);

    const handleUpdateExtension = EditorView.updateListener.of(
      (update: ViewUpdate) => {
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
      }
    );

    let extensions = [
      bracketMatching(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      lineNumbers(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      // custom extensions
      handleUpdateExtension,
      // hds dark theme
      hdsDarkTheme,
      syntaxHighlighting(hdsDarkHighlightStyle),
    ];

    if (languageExtension !== undefined) {
      extensions = [languageExtension, ...extensions];
    }

    return extensions;
  });

  private _createEditorTask = task(
    { drop: true },
    async (
      element: HTMLElement,
      {
        language,
        value,
      }: Pick<HdsCodeEditorSignature['Args']['Named'], 'language' | 'value'>
    ) => {
      try {
        const { EditorState } = await import('@codemirror/state');
        const { EditorView } = await import('@codemirror/view');

        const extensions = await this._buildExtensionsTask.perform({
          language,
        });

        const state = EditorState.create({
          doc: value,
          extensions,
        });

        const editor = new EditorView({
          state,
          parent: element,
        });

        return editor;
      } catch (error) {
        console.error(
          `\`hds-code-editor\` modifier - Failed to setup the CodeMirror editor. Error: ${JSON.stringify(error)}`
        );
      }
    }
  );

  private _setupTask = task(
    { drop: true },
    async (
      element: HTMLElement,
      _positional: PositionalArgs<HdsCodeEditorSignature>,
      named: NamedArgs<HdsCodeEditorSignature>
    ) => {
      const { onInput, onSetup, ariaLabel, ariaLabelledBy, language, value } =
        named;

      this.element = element;
      this.onInput = onInput;

      const editor = await this._createEditorTask.perform(element, {
        language,
        value,
      });

      if (editor === undefined) {
        return;
      }

      this.editor = editor;

      this._setupEditorAriaAttributes(editor, { ariaLabel, ariaLabelledBy });

      onSetup?.(this.editor);
    }
  );
}
