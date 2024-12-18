import { a as _defineProperty } from '../_rollupPluginBabelHelpers-81503waH.js';
import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { assert } from '@ember/debug';
import Modifier from 'ember-modifier';
import 'ember-concurrency';
import config from 'ember-get-config';
import hdsDark from './hds-code-editor/themes/hds-dark-theme.js';
import hdsDarkHighlightStyle from './hds-code-editor/highlight-styles/hds-dark-highlight-style.js';

const LOADER_HEIGHT = '164px';
class HdsCodeEditorModifier extends Modifier {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "editor", void 0);
    _defineProperty(this, "element", void 0);
    _defineProperty(this, "onInput", void 0);
    _defineProperty(this, "observer", void 0);
    _defineProperty(this, "loadLanguageTask", buildTask(() => ({
      context: this,
      generator: function* (language) {
        if (language === undefined) {
          return;
        }
        let module = null;
        let languageFunction = null;
        switch (language) {
          case 'go':
            module = yield import('@codemirror/lang-go');
            languageFunction = module.go;
            break;
          case 'json':
            module = yield import('@codemirror/lang-json');
            languageFunction = module.json;
            break;
          case 'sql':
            module = yield import('@codemirror/lang-sql');
            languageFunction = module.sql;
            break;
          case 'hcl':
            module = yield import('codemirror-lang-hcl');
            languageFunction = module.hcl;
            break;
          default:
            throw new Error(`Language ${language} is not supported`);
        }
        return languageFunction();
      }
    }), {
      drop: true
    }, "loadLanguageTask", null));
    _defineProperty(this, "setupTask", buildTask(() => ({
      context: this,
      generator: function* (element, _positional, named) {
        const {
          onInput,
          onSetup,
          language,
          value
        } = named;
        const [{
          EditorView,
          keymap,
          lineNumbers,
          highlightActiveLineGutter,
          highlightSpecialChars,
          highlightActiveLine
        }, {
          EditorState
        }, {
          defaultKeymap,
          history,
          historyKeymap
        }, {
          bracketMatching,
          syntaxHighlighting
        }] = yield Promise.all([import('@codemirror/view'), import('@codemirror/state'), import('@codemirror/commands'), import('@codemirror/language')]);
        this.onInput = onInput;
        const languageExtension = yield this.loadLanguageTask.perform(language);
        let extensions = [lineNumbers(), highlightActiveLineGutter(), highlightSpecialChars(), highlightActiveLine(), EditorView.updateListener.of(update => {
          // toggle a class if the update has/does not have a selection
          if (update.selectionSet) {
            update.view.dom.classList.toggle('cm-hasSelection', !update.state.selection.main.empty);
          }

          // call the onInput callback if the document has changed
          if (!update.docChanged || this.onInput === undefined) {
            return;
          }
          this.onInput(update.state.doc.toString());
        }), hdsDark, keymap.of([...defaultKeymap, ...historyKeymap]), bracketMatching(), syntaxHighlighting(hdsDarkHighlightStyle), history()];
        if (languageExtension !== undefined) {
          extensions = [languageExtension, ...extensions];
        }
        const state = EditorState.create({
          doc: value,
          extensions
        });
        const editor = new EditorView({
          state,
          parent: element
        });
        this.editor = editor;
        this.element = element;
        onSetup?.(this.editor);
      }
    }), {
      drop: true
    }, "setupTask", null));
  }
  modify(element, positional, named) {
    assert('HdsCodeEditor must have an element', element);
    // the intersection observer makes loading unreliable in tests
    if (config.environment === 'test') {
      this.setupTask.perform(element, positional, named);
    } else {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && this.setupTask.performCount === 0) {
            this.setupTask.perform(element, positional, named);
          }
        });
      }, {
        rootMargin: LOADER_HEIGHT
      });
      this.observer.observe(element);
    }
  }
  willRemove() {
    this.observer.disconnect();
  }
}

export { HdsCodeEditorModifier as default };
//# sourceMappingURL=hds-code-editor.js.map
