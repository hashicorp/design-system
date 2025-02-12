import { a as _defineProperty } from '../_rollupPluginBabelHelpers-C_TsMG3M.js';
import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import Modifier from 'ember-modifier';
import { assert, warn } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import 'ember-concurrency';
import config from 'ember-get-config';
import hdsDark from './hds-code-editor/themes/hds-dark-theme.js';
import hdsDarkHighlightStyle from './hds-code-editor/highlight-styles/hds-dark-highlight-style.js';

async function defineStreamLanguage(streamParser) {
  const {
    StreamLanguage
  } = await import('@codemirror/language');
  return StreamLanguage.define(streamParser);
}
const LOADER_HEIGHT = '164px';
const LANGUAGES = {
  ruby: {
    load: async () => {
      const {
        ruby
      } = await import('@codemirror/legacy-modes/mode/ruby');
      return defineStreamLanguage(ruby);
    }
  },
  sentinel: {
    load: async () => {
      const {
        sentinel
      } = await import('./hds-code-editor/languages/sentinel.js');
      return defineStreamLanguage(sentinel);
    }
  },
  shell: {
    load: async () => {
      const {
        shell
      } = await import('@codemirror/legacy-modes/mode/shell');
      return defineStreamLanguage(shell);
    }
  },
  go: {
    load: async () => (await import('@codemirror/lang-go')).go()
  },
  hcl: {
    load: async () => (await import('codemirror-lang-hcl')).hcl()
  },
  json: {
    load: async () => (await import('@codemirror/lang-json')).json()
  },
  sql: {
    load: async () => (await import('@codemirror/lang-sql')).sql()
  },
  yaml: {
    load: async () => (await import('@codemirror/lang-yaml')).yaml()
  }
};
class HdsCodeEditorModifier extends Modifier {
  constructor(owner, args) {
    super(owner, args);
    _defineProperty(this, "editor", undefined);
    _defineProperty(this, "element", undefined);
    _defineProperty(this, "onBlur", undefined);
    _defineProperty(this, "onInput", undefined);
    _defineProperty(this, "blurHandler", undefined);
    _defineProperty(this, "observer", undefined);
    _defineProperty(this, "_loadLanguageTask", buildTask(() => ({
      context: this,
      generator: function* (language) {
        if (language === undefined) {
          return;
        }
        try {
          const validLanguageKeys = Object.keys(LANGUAGES);
          assert(`\`hds-code-editor\` modifier - \`language\` must be one of the following: ${validLanguageKeys.join(', ')}; received: ${language}`, validLanguageKeys.includes(language));
          return LANGUAGES[language].load();
        } catch (error) {
          warn(`\`hds-code-editor\` modifier - Failed to dynamically import the CodeMirror language module for '${language}'. Error: ${JSON.stringify(error)}`, {
            id: 'hds-code-editor.load-language-task.import-failed'
          });
        }
      }
    }), {
      drop: true
    }, "_loadLanguageTask", null));
    _defineProperty(this, "_buildExtensionsTask", buildTask(() => ({
      context: this,
      generator: function* ({
        language
      }) {
        const [{
          EditorView,
          keymap,
          lineNumbers,
          highlightActiveLineGutter,
          highlightSpecialChars,
          highlightActiveLine
        }, {
          defaultKeymap,
          history,
          historyKeymap
        }, {
          bracketMatching,
          syntaxHighlighting
        }] = yield Promise.all([import('@codemirror/view'), import('@codemirror/commands'), import('@codemirror/language')]);
        const languageExtension = yield this._loadLanguageTask.perform(language);
        const handleUpdateExtension = EditorView.updateListener.of(update => {
          // toggle a class if the update has/does not have a selection
          if (update.selectionSet) {
            update.view.dom.classList.toggle('cm-hasSelection', !update.state.selection.main.empty);
          }

          // call the onInput callback if the document has changed
          if (!update.docChanged || this.onInput === undefined) {
            return;
          }
          this.onInput(update.state.doc.toString());
        });
        let extensions = [bracketMatching(), highlightActiveLine(), highlightActiveLineGutter(), highlightSpecialChars(), history(), lineNumbers(), keymap.of([...defaultKeymap, ...historyKeymap]),
        // custom extensions
        handleUpdateExtension,
        // hds dark theme
        hdsDark, syntaxHighlighting(hdsDarkHighlightStyle)];
        if (languageExtension !== undefined) {
          extensions = [languageExtension, ...extensions];
        }
        return extensions;
      }
    }), {
      drop: true
    }, "_buildExtensionsTask", null));
    _defineProperty(this, "_createEditorTask", buildTask(() => ({
      context: this,
      generator: function* (element, {
        language,
        value
      }) {
        try {
          const {
            EditorState
          } = yield import('@codemirror/state');
          const {
            EditorView
          } = yield import('@codemirror/view');
          const extensions = yield this._buildExtensionsTask.perform({
            language
          });
          const state = EditorState.create({
            doc: value,
            extensions
          });
          const editor = new EditorView({
            state,
            parent: element
          });
          return editor;
        } catch (error) {
          console.error(`\`hds-code-editor\` modifier - Failed to setup the CodeMirror editor. Error: ${JSON.stringify(error)}`);
        }
      }
    }), {
      drop: true
    }, "_createEditorTask", null));
    _defineProperty(this, "_setupTask", buildTask(() => ({
      context: this,
      generator: function* (element, _positional, named) {
        const {
          onBlur,
          onInput,
          onSetup,
          ariaDescribedBy,
          ariaLabel,
          ariaLabelledBy,
          language,
          value
        } = named;
        this.onInput = onInput;
        this.onBlur = onBlur;
        this.element = element;
        const editor = yield this._createEditorTask.perform(element, {
          language,
          value
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
          ariaLabelledBy
        });
        onSetup?.(this.editor);
      }
    }), {
      drop: true
    }, "_setupTask", null));
    registerDestructor(this, () => {
      this.observer?.disconnect();
      if (this.onBlur !== undefined) {
        this.element.removeEventListener('blur', this.blurHandler);
      }
    });
  }
  modify(element, positional, named) {
    // the intersection observer makes loading unreliable in tests
    if (config.environment === 'test') {
      this._setupTask.perform(element, positional, named);
    } else {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const setupHasNotRun = this._setupTask.performCount === 0;
          if (entry.isIntersecting && setupHasNotRun) {
            this._setupTask.perform(element, positional, named);
          }
        });
      }, {
        rootMargin: LOADER_HEIGHT
      });
      this.observer.observe(element);
    }
  }
  _setupEditorBlurHandler(element, onBlur) {
    const inputElement = element.querySelector('.cm-content');
    if (inputElement === null) {
      return;
    }
    this.blurHandler = event => onBlur(this.editor, event);
    inputElement.addEventListener('blur', this.blurHandler);
  }
  _setupEditorAriaLabel(editor, {
    ariaLabel,
    ariaLabelledBy
  }) {
    assert('`hds-code-editor` modifier - Either `ariaLabel` or `ariaLabelledBy` must be provided', ariaLabel !== undefined || ariaLabelledBy !== undefined);
    if (ariaLabel !== undefined) {
      editor.dom.querySelector('[role="textbox"]')?.setAttribute('aria-label', ariaLabel);
    } else if (ariaLabelledBy !== undefined) {
      editor.dom.querySelector('[role="textbox"]')?.setAttribute('aria-labelledby', ariaLabelledBy);
    }
  }
  _setupEditorAriaDescribedBy(editor, ariaDescribedBy) {
    if (ariaDescribedBy === undefined) {
      return;
    }
    editor.dom.querySelector('[role="textbox"]')?.setAttribute('aria-describedby', ariaDescribedBy);
  }
  _setupEditorAriaAttributes(editor, {
    ariaDescribedBy,
    ariaLabel,
    ariaLabelledBy
  }) {
    this._setupEditorAriaLabel(editor, {
      ariaLabel,
      ariaLabelledBy
    });
    this._setupEditorAriaDescribedBy(editor, ariaDescribedBy);
  }
}

export { HdsCodeEditorModifier as default };
//# sourceMappingURL=hds-code-editor.js.map
