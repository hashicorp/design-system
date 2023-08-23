// import Modifier, { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import Modifier from 'ember-modifier';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import codemirror from 'codemirror';

// import type Owner from '@ember/owner';

// import 'core/utils/register-codemirror-hcl';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/go/go';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/shell/shell';

// Here we define default options for the editor.
// These should follow the codemirror configuration types
// https://codemirror.net/doc/manual.html#config

// TODO: create custom theme (KB)
const PRESET_DEFAULTS = {
  theme: 'dracula',
};

function cleanup(instance) {
  const { editor, element, observer, onChange } = instance;
  editor.off('change', onChange);
  observer.unobserve(element);
}

/**
 *
 * `CodeMirror` implements a modifier that creates a CodeMirror instance on the
 * provided element.
 *
 * The supported modes for the editor are currently: hcl, shell, go, javascript
 * The supported themes are: dracula
 *
 * Sample usage:
 * ```
 * <div
 *   {{code-mirror options=@options value=@value}}
 * />
 * ```
 *
 * @class CodeMirrorModifier
 *
 */
export default class HdsCodeMirrorModifier extends Modifier {
  didSetup = false;

  // editor = codemirror.Editor;
  // element = HTMLElement;

  // Codemirror does not render if it's not visible so we'll watch for the
  // element's visibility to enter the viewport and refresh it. This is helpful
  // in the case of codemirror being in a tab that is not immediately visible.
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          this.editor.refresh();
        }
      });
    },
    { rootMargin: '0px', threshold: 1.0 }
  );

  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  modify(element, positional, named) {
    assert('CodeMirror must have an element', element);

    if (!this.didSetup) {
      this.#setup(element, positional, named);
      this.didSetup = true;
    }

    this.#update(element, positional, named);
  }

  #setup(element, _positional, named) {
    const {
      onInput,
      options = {},
      value,
      lineNumbers,
      lineWrapping,
      readOnly,
      mode = 'javascript',
    } = named;

    this.onInput = onInput;

    this.editor = codemirror(element, {
      ...PRESET_DEFAULTS,
      ...options,
      value,
      lineNumbers,
      lineWrapping,
      readOnly,
      mode,
    });

    this.element = element;
    this.editor.on('change', this.onChange.bind(this));
    this.observer.observe(element);
  }

  onChange(editor) {
    const newVal = editor.getValue();
    this.onInput && this.onInput(newVal);
  }

  #update(_element, _positional, named) {
    const { value } = named;

    if (this.editor.getValue() !== value) {
      this.editor.setValue(value);
    }
  }
}
