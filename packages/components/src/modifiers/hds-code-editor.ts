/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Modifier from 'ember-modifier';
import { assert, warn } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { task } from 'ember-concurrency';
import { macroCondition, isTesting } from '@embroider/macros';
import { Compartment } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { guidFor } from '@ember/object/internals';
import { isEmpty } from '@ember/utils';
import { service } from '@ember/service';

// hds-dark theme
import hdsDarkTheme from './hds-code-editor/themes/hds-dark-theme.ts';
import hdsDarkHighlightStyle from './hds-code-editor/highlight-styles/hds-dark-highlight-style.ts';

import type HdsIntlService from '../services/hds-intl.ts';
import type { HdsCodeEditorLanguages } from './hds-code-editor/types.ts';
import type { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import type {
  StreamLanguage as StreamLanguageType,
  StreamParser as StreamParserType,
} from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import type {
  EditorView as EditorViewType,
  KeyBinding,
  ViewUpdate,
} from '@codemirror/view';
import type { Diagnostic as DiagnosticType } from '@codemirror/lint';
import type Owner from '@ember/owner';

type HTMLElementWithEditor = HTMLElement & { editor: EditorViewType };

type HdsCodeEditorBlurHandler = (
  editor: EditorViewType,
  event: FocusEvent
) => void;

interface HdsCodeEditorExtraKeys {
  [key: string]: () => void;
}

export interface HdsCodeEditorSignature {
  Args: {
    Named: {
      ariaDescribedBy?: string;
      ariaLabel?: string;
      ariaLabelledBy?: string;
      cspNonce?: string;
      extraKeys?: HdsCodeEditorExtraKeys;
      hasLineWrapping?: boolean;
      isLintingEnabled?: boolean;
      language?: HdsCodeEditorLanguages;
      value?: string;
      onInput?: (newValue: string, editor: EditorViewType) => void;
      onBlur?: HdsCodeEditorBlurHandler;
      onLint?: (
        diagnostics: DiagnosticType[],
        newValue: string,
        editor: EditorViewType
      ) => void;
      onSetup?: (editor: EditorViewType) => unknown;
    };
  };
}

async function defineStreamLanguage(streamParser: StreamParserType<unknown>) {
  const { StreamLanguage } = await import('@codemirror/language');

  return StreamLanguage.define(streamParser);
}

export function getCSPNonceFromMeta(): string | undefined {
  const meta = document.querySelector(
    'meta[http-equiv="Content-Security-Policy"]'
  );

  if (meta === null) {
    return undefined;
  }

  const content = meta.getAttribute('content');

  if (content === null) {
    return undefined;
  }

  // searches for either "style-src" or "script-src" followed by anything until a token like 'nonce-<value>'
  const match = content.match(/(?:style-src|script-src)[^;]*'nonce-([^']+)'/);

  return match ? match[1] : undefined;
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
  @service declare hdsIntl: HdsIntlService;

  editor!: EditorViewType;
  element!: HTMLElementWithEditor;

  onBlur: HdsCodeEditorSignature['Args']['Named']['onBlur'];
  onInput: HdsCodeEditorSignature['Args']['Named']['onInput'];

  blurHandler!: (event: FocusEvent) => void;
  intersectionObserver!: IntersectionObserver;
  mutationObserver!: MutationObserver;

  lineWrappingCompartment = new Compartment();

  constructor(owner: Owner, args: ArgsFor<HdsCodeEditorSignature>) {
    super(owner, args);

    registerDestructor(this, () => {
      this.intersectionObserver?.disconnect();
      this.mutationObserver?.disconnect();

      if (this.onBlur !== undefined) {
        this.element.removeEventListener('blur', this.blurHandler);
      }
    });
  }

  modify(
    element: HTMLElementWithEditor,
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
      if (macroCondition(isTesting())) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._setupTask.perform(element, positional, named);
      } else {
        this.intersectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && this.editor === undefined) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                this._setupTask.perform(element, positional, named);
              }
            });
          },
          {
            rootMargin: LOADER_HEIGHT,
          }
        );

        this.intersectionObserver.observe(element);
      }
    }
  }

  private _setupEditorBlurHandler(
    element: HTMLElementWithEditor,
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
    {
      ariaDescribedBy,
      lintingDescriptionElement,
    }: {
      ariaDescribedBy?: string;
      lintingDescriptionElement?: HTMLParagraphElement;
    }
  ) {
    if (
      ariaDescribedBy === undefined &&
      lintingDescriptionElement === undefined
    ) {
      return;
    }

    const ariaDescribedByArray = [];

    if (ariaDescribedBy !== undefined) {
      ariaDescribedByArray.push(ariaDescribedBy);
    }

    if (lintingDescriptionElement !== undefined) {
      ariaDescribedByArray.push(lintingDescriptionElement.id);
    }

    editor.dom
      .querySelector('[role="textbox"]')
      ?.setAttribute('aria-describedby', ariaDescribedByArray.join(' '));
  }

  private _createLintingDescriptionElement(): HTMLParagraphElement {
    const element = document.createElement('p');

    element.id = `lint-panel-instructions-${this.element.id}`;
    element.classList.add('sr-only');
    element.textContent = this.hdsIntl.t(
      'hds.modifiers.hds-code-editor.lint-panel-description',
      {
        default:
          'Press `Ctrl-Shift-m` (`Cmd-Shift-m` on macOS) while focus is on the textbox to open the linting panel',
      }
    );

    this.element.insertAdjacentElement('beforebegin', element);

    return element;
  }

  private _setupEditorAriaAttributes(
    editor: EditorViewType,
    {
      ariaDescribedBy,
      ariaLabel,
      ariaLabelledBy,
      lintingDescriptionElement,
    }: Pick<
      HdsCodeEditorSignature['Args']['Named'],
      'ariaDescribedBy' | 'ariaLabel' | 'ariaLabelledBy'
    > & { lintingDescriptionElement?: HTMLParagraphElement }
  ) {
    this._setupEditorAriaLabel(editor, { ariaLabel, ariaLabelledBy });
    this._setupEditorAriaDescribedBy(editor, {
      ariaDescribedBy,
      lintingDescriptionElement,
    });
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
    async ({
      cspNonce,
      extraKeys,
      language,
      hasLineWrapping,
      isLintingEnabled,
      onLint,
    }) => {
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          language,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          isLintingEnabled,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
          this.onInput(update.state.doc.toString(), update.view);
        }
      );

      const lineWrappingExtension = this.lineWrappingCompartment.of(
        hasLineWrapping ? EditorView.lineWrapping : []
      );

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

      if (extraKeys !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const customKeyMap = Object.entries(extraKeys).map(([key, value]) => ({
          key: key,
          run: value,
        }));

        extensions = [keymap.of(customKeyMap as KeyBinding[]), ...extensions];
      }

      if (languageExtensions !== undefined) {
        extensions = [...extensions, ...languageExtensions];
      }

      // add nonce to the editor view if it exists
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const nonce = cspNonce ?? getCSPNonceFromMeta();

      if (nonce !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        extensions = [...extensions, EditorView.cspNonce.of(nonce)];
      }

      // ensure we add lineNumber last in the stack to create the right gutter order for linting
      extensions = [...extensions, lineNumbers()];

      return extensions;
    }
  );

  private _createEditorTask = task(
    { drop: true },
    async (
      element: HTMLElementWithEditor,
      {
        cspNonce,
        language,
        extraKeys,
        value,
        hasLineWrapping,
        isLintingEnabled,
        onLint,
      }: Pick<
        HdsCodeEditorSignature['Args']['Named'],
        | 'cspNonce'
        | 'language'
        | 'extraKeys'
        | 'value'
        | 'hasLineWrapping'
        | 'isLintingEnabled'
        | 'onLint'
      >
    ) => {
      try {
        const { EditorState } = await import('@codemirror/state');

        const extensions = await this._buildExtensionsTask.perform({
          cspNonce,
          extraKeys,
          language,
          hasLineWrapping: hasLineWrapping ?? false,
          isLintingEnabled,
          onLint,
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

  private _setupEditorMutationObserver() {
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return;
          }

          const removedNodeContainsLintPanel =
            node.querySelector('.cm-panel-lint') !== null;

          if (removedNodeContainsLintPanel) {
            this.editor.focus();
          }
        });
      });
    });

    this.mutationObserver.observe(this.element, {
      childList: true,
      subtree: true,
    });
  }

  private _setupTask = task(
    { drop: true },
    async (
      element: HTMLElementWithEditor,
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
        cspNonce,
        extraKeys,
        hasLineWrapping,
        isLintingEnabled,
        language,
        value,
      } = named;

      this.onInput = onInput;
      this.onBlur = onBlur;

      this.element = element;
      this.element.id = isEmpty(this.element.id)
        ? guidFor(this)
        : this.element.id;

      const editor = await this._createEditorTask.perform(element, {
        onLint,
        cspNonce,
        hasLineWrapping,
        isLintingEnabled,
        extraKeys,
        language,
        value,
      });

      if (editor === undefined) {
        return;
      }

      this.editor = editor;
      element.editor = editor;

      if (onBlur !== undefined) {
        this._setupEditorBlurHandler(element, onBlur);
      }

      let lintingDescriptionElement: HTMLParagraphElement | null = null;

      if (
        isLintingEnabled &&
        language !== undefined &&
        LANGUAGES[language]?.loadLinter !== undefined
      ) {
        // insert a new dom element above the editor
        lintingDescriptionElement = this._createLintingDescriptionElement();

        this._setupEditorMutationObserver();
      }

      this._setupEditorAriaAttributes(editor, {
        ariaDescribedBy,
        ariaLabel,
        ariaLabelledBy,
        lintingDescriptionElement: lintingDescriptionElement ?? undefined,
      });

      onSetup?.(this.editor);
    }
  );
}
