/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Modifier from 'ember-modifier';
import { assert, warn } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { task } from 'ember-concurrency';
import config from 'ember-get-config';
import { Compartment } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

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
import type {
  EditorView as EditorViewType,
  ViewUpdate,
} from '@codemirror/view';
import type { Diagnostic as DiagnosticType } from '@codemirror/lint';
import type Owner from '@ember/owner';
import type { ParseError } from 'jsonc-parser';

type HdsCodeEditorBlurHandler = (
  editor: EditorViewType,
  event: FocusEvent
) => void;

export interface HdsCodeEditorSignature {
  Args: {
    Named: {
      ariaDescribedBy?: string;
      ariaLabel?: string;
      ariaLabelledBy?: string;
      hasLineWrapping?: boolean;
      isLintingEnabled?: boolean;
      language?: HdsCodeEditorLanguages;
      value?: string;
      onInput?: (newVal: string) => void;
      onBlur?: HdsCodeEditorBlurHandler;
      onLint?: (diagnostics: DiagnosticType[]) => void;
      onSetup?: (editor: EditorViewType) => unknown;
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
  {
    load: () => Promise<Extension | StreamLanguageType<unknown>>;
    loadLinter?: (
      onLint?: HdsCodeEditorSignature['Args']['Named']['onLint']
    ) => Promise<Extension>;
  }
> = {
  rego: {
    load: async () => {
      const { rego } = await import('./hds-code-editor/languages/rego.ts');
      return defineStreamLanguage(rego);
    },
  },
  ruby: {
    load: async () => {
      const { ruby } = await import('@codemirror/legacy-modes/mode/ruby');
      return defineStreamLanguage(ruby);
    },
  },
  sentinel: {
    load: async () => {
      const { sentinel } = await import(
        './hds-code-editor/languages/sentinel.ts'
      );
      return defineStreamLanguage(sentinel);
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
  javascript: {
    load: async () =>
      (await import('@codemirror/lang-javascript')).javascript(),
  },
  json: {
    load: async () => (await import('@codemirror/lang-json')).json(),
    loadLinter: async (onLint) => {
      const linter = await import('./hds-code-editor/linters/json-linter.ts');

      return linter.default(onLint);
    },
  },
  markdown: {
    load: async () => (await import('@codemirror/lang-markdown')).markdown(),
  },
  sql: {
    load: async () => (await import('@codemirror/lang-sql')).sql(),
  },
  yaml: {
    load: async () => (await import('@codemirror/lang-yaml')).yaml(),
  },
} as const;

export default class HdsCodeEditorModifier extends Modifier<HdsCodeEditorSignature> {
  editor!: EditorViewType;
  element!: HTMLElement;

  onBlur: HdsCodeEditorSignature['Args']['Named']['onBlur'];
  onInput: HdsCodeEditorSignature['Args']['Named']['onInput'];

  blurHandler!: (event: FocusEvent) => void;
  observer!: IntersectionObserver;

  lineWrappingCompartment = new Compartment();

  constructor(owner: Owner, args: ArgsFor<HdsCodeEditorSignature>) {
    super(owner, args);

    registerDestructor(this, () => {
      this.observer?.disconnect();

      if (this.onBlur !== undefined) {
        this.element.removeEventListener('blur', this.blurHandler);
      }
    });
  }

  modify(
    element: HTMLElement,
    positional: PositionalArgs<HdsCodeEditorSignature>,
    named: NamedArgs<HdsCodeEditorSignature>
  ): void {
    const { hasLineWrapping = false } = named;

    // if the editor already exists, update the line wrapping
    if (this.editor) {
      this.editor.dispatch({
        effects: this.lineWrappingCompartment.reconfigure(
          hasLineWrapping ? EditorView.lineWrapping : []
        ),
      });
    }
    // if the editor does not exist, setup the editor
    else {
      // the intersection observer makes loading unreliable in tests
      if (config.environment === 'test') {
        this._setupTask.perform(element, positional, named);
      } else {
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && this.editor === undefined) {
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
  }

  private _setupEditorBlurHandler(
    element: HTMLElement,
    onBlur: HdsCodeEditorBlurHandler
  ) {
    const inputElement = element.querySelector('.cm-content');

    if (inputElement === null) {
      return;
    }

    this.blurHandler = (event: FocusEvent) => onBlur(this.editor, event);

    (inputElement as HTMLElement).addEventListener('blur', this.blurHandler);
  }

  private _setupEditorAriaLabel(
    editor: EditorViewType,
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
      editor.dom
        .querySelector('[role="textbox"]')
        ?.setAttribute('aria-label', ariaLabel);
    } else if (ariaLabelledBy !== undefined) {
      editor.dom
        .querySelector('[role="textbox"]')
        ?.setAttribute('aria-labelledby', ariaLabelledBy);
    }
  }

  private _setupEditorAriaDescribedBy(
    editor: EditorViewType,
    ariaDescribedBy?: string
  ) {
    if (ariaDescribedBy === undefined) {
      return;
    }

    editor.dom
      .querySelector('[role="textbox"]')
      ?.setAttribute('aria-describedby', ariaDescribedBy);
  }

  private _setupEditorAriaAttributes(
    editor: EditorViewType,
    {
      ariaDescribedBy,
      ariaLabel,
      ariaLabelledBy,
    }: Pick<
      HdsCodeEditorSignature['Args']['Named'],
      'ariaDescribedBy' | 'ariaLabel' | 'ariaLabelledBy'
    >
  ) {
    this._setupEditorAriaLabel(editor, { ariaLabel, ariaLabelledBy });
    this._setupEditorAriaDescribedBy(editor, ariaDescribedBy);
  }

  private _loadLanguageExtensionsTask = task(
    { drop: true },
    async ({
      language,
      isLintingEnabled,
      onLint,
    }: {
      language?: HdsCodeEditorLanguages;
      isLintingEnabled?: boolean;
      onLint?: HdsCodeEditorSignature['Args']['Named']['onLint'];
    }) => {
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

        let extensionPromises = [LANGUAGES[language].load()];

        if (isLintingEnabled && LANGUAGES[language].loadLinter) {
          extensionPromises = [
            ...extensionPromises,
            LANGUAGES[language].loadLinter(onLint),
          ];
        }

        return Promise.all(extensionPromises);
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

  private _buildExtensionsTask = task(
    { drop: true },
    async ({ language, hasLineWrapping, isLintingEnabled, onLint }) => {
      const [
        {
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

      const languageExtensions = await this._loadLanguageExtensionsTask.perform(
        {
          language,
          isLintingEnabled,
          onLint,
        }
      );

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

      const lineWrappingExtension = this.lineWrappingCompartment.of(
        hasLineWrapping ? EditorView.lineWrapping : []
      );

      let lintingExtensions: Extension[] = [];

      if (isLintingEnabled) {
        const [{ linter, lintGutter }, { parse, printParseErrorCode }] =
          await Promise.all([
            import('@codemirror/lint'),
            import('jsonc-parser'),
          ]);

        lintingExtensions = [
          linter((view): Diagnostic[] => {
            const diagnostics: Diagnostic[] = [];
            const code = view.state.doc.toString();
            const errors: ParseError[] = [];

            parse(code, errors, {
              allowTrailingComma: false,
              disallowComments: true,
            });

            for (const err of errors) {
              diagnostics.push({
                from: err.offset,
                to: err.offset + err.length,
                severity: 'error',
                message: printParseErrorCode(err.error),
              });
            }

            return diagnostics;
          }),
          lintGutter(),
        ];
      }

      let extensions = [
        lineWrappingExtension,
        bracketMatching(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        // custom extensions
        handleUpdateExtension,
        // hds dark theme
        hdsDarkTheme,
        syntaxHighlighting(hdsDarkHighlightStyle),
      ];

      if (languageExtensions !== undefined) {
        extensions = [...extensions, ...languageExtensions];
      }

      // ensure we add lineNumber last in the stack to create the right gutter order for linting
      extensions = [...extensions, lineNumbers()];

      return extensions;
    }
  );

  private _createEditorTask = task(
    { drop: true },
    async (
      element: HTMLElement,
      {
        onLint,
        hasLineWrapping,
        isLintingEnabled,
        language,
        value,
      }: Pick<
        HdsCodeEditorSignature['Args']['Named'],
        'language' | 'value' | 'hasLineWrapping' | 'isLintingEnabled' | 'onLint'
      >
    ) => {
      try {
        const { EditorState } = await import('@codemirror/state');

        const extensions = await this._buildExtensionsTask.perform({
          onLint,
          hasLineWrapping: hasLineWrapping ?? false,
          isLintingEnabled,
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
      const {
        onBlur,
        onInput,
        onLint,
        onSetup,
        ariaDescribedBy,
        ariaLabel,
        ariaLabelledBy,
        hasLineWrapping,
        isLintingEnabled,
        language,
        value,
      } = named;

      this.onInput = onInput;
      this.onBlur = onBlur;

      this.element = element;

      const editor = await this._createEditorTask.perform(element, {
        onLint,
        hasLineWrapping,
        isLintingEnabled,
        language,
        value,
      });

      if (editor === undefined) {
        return;
      }

      this.editor = editor;

      if (onBlur !== undefined) {
        this._setupEditorBlurHandler(element, onBlur);
      }

      this._setupEditorAriaAttributes(editor, {
        ariaDescribedBy,
        ariaLabel,
        ariaLabelledBy,
      });

      onSetup?.(this.editor);
    }
  );
}
