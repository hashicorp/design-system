import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import Modifier from 'ember-modifier';
import { assert, warn } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import 'ember-concurrency';
import config from 'ember-get-config';
import { Compartment } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import hdsDark from './hds-code-editor/themes/hds-dark-theme.js';
import hdsDarkHighlightStyle from './hds-code-editor/highlight-styles/hds-dark-highlight-style.js';

async function defineStreamLanguage(streamParser) {
  const {
    StreamLanguage
  } = await import('@codemirror/language');
  return StreamLanguage.define(streamParser);
}
function getCSPNonceFromMeta() {
  const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
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
const LANGUAGES = {
  rego: {
    load: async () => {
      const {
        rego
      } = await import('./hds-code-editor/languages/rego.js');
      return defineStreamLanguage(rego);
    }
  },
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
  javascript: {
    load: async () => (await import('@codemirror/lang-javascript')).javascript()
  },
  json: {
    load: async () => (await import('@codemirror/lang-json')).json()
  },
  markdown: {
    load: async () => (await import('@codemirror/lang-markdown')).markdown()
  },
  sql: {
    load: async () => (await import('@codemirror/lang-sql')).sql()
  },
  yaml: {
    load: async () => (await import('@codemirror/lang-yaml')).yaml()
  }
};
class HdsCodeEditorModifier extends Modifier {
  editor;
  element;
  onBlur;
  onInput;
  blurHandler;
  observer;
  lineWrappingCompartment = new Compartment();
  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, () => {
      this.observer?.disconnect();
      if (this.onBlur !== undefined) {
        this.element.removeEventListener('blur', this.blurHandler);
      }
    });
  }
  modify(element, positional, named) {
    const {
      hasLineWrapping = false
    } = named;

    // if the editor already exists, update the line wrapping
    if (this.editor) {
      this.editor.dispatch({
        effects: this.lineWrappingCompartment.reconfigure(hasLineWrapping ? EditorView.lineWrapping : [])
      });
    }
    // if the editor does not exist, setup the editor
    else {
      // the intersection observer makes loading unreliable in tests
      if (config.environment === 'test') {
        this._setupTask.perform(element, positional, named);
      } else {
        this.observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && this.editor === undefined) {
              this._setupTask.perform(element, positional, named);
            }
          });
        }, {
          rootMargin: LOADER_HEIGHT
        });
        this.observer.observe(element);
      }
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
  _loadLanguageTask = buildTask(() => ({
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
  }, "_loadLanguageTask", null);
  _buildExtensionsTask = buildTask(() => ({
    context: this,
    generator: function* ({
      cspNonce,
      language,
      hasLineWrapping
    }) {
      const [{
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
      const lineWrappingExtension = this.lineWrappingCompartment.of(hasLineWrapping ? EditorView.lineWrapping : []);
      let extensions = [lineWrappingExtension, bracketMatching(), highlightActiveLine(), highlightActiveLineGutter(), highlightSpecialChars(), history(), lineNumbers(), keymap.of([...defaultKeymap, ...historyKeymap]),
      // custom extensions
      handleUpdateExtension,
      // hds dark theme
      hdsDark, syntaxHighlighting(hdsDarkHighlightStyle)];
      if (languageExtension !== undefined) {
        extensions = [languageExtension, ...extensions];
      }

      // add nonce to the editor view if it exists
      const nonce = cspNonce ?? getCSPNonceFromMeta();
      if (nonce !== undefined) {
        extensions = [...extensions, EditorView.cspNonce.of(nonce)];
      }
      return extensions;
    }
  }), {
    drop: true
  }, "_buildExtensionsTask", null);
  _createEditorTask = buildTask(() => ({
    context: this,
    generator: function* (element, {
      cspNonce,
      language,
      value,
      hasLineWrapping
    }) {
      try {
        const {
          EditorState
        } = yield import('@codemirror/state');
        const extensions = yield this._buildExtensionsTask.perform({
          cspNonce,
          language,
          hasLineWrapping: hasLineWrapping ?? false
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
  }, "_createEditorTask", null);
  _setupTask = buildTask(() => ({
    context: this,
    generator: function* (element, _positional, named) {
      const {
        onBlur,
        onInput,
        onSetup,
        ariaDescribedBy,
        ariaLabel,
        ariaLabelledBy,
        cspNonce,
        hasLineWrapping,
        language,
        value
      } = named;
      this.onInput = onInput;
      this.onBlur = onBlur;
      this.element = element;
      const editor = yield this._createEditorTask.perform(element, {
        cspNonce,
        language,
        value,
        hasLineWrapping
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
  }, "_setupTask", null);
}

export { HdsCodeEditorModifier as default, getCSPNonceFromMeta };
//# sourceMappingURL=hds-code-editor.js.map
