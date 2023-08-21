import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import Modifier, { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import codemirror from 'codemirror';

import type Owner from '@ember/owner';

import 'core/utils/register-codemirror-hcl';
import 'codemirror/mode/go/go';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/shell/shell';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/selection/active-line';

// Here we define default options for the editor.
// These should follow the codemirror configuration types
// https://codemirror.net/doc/manual.html#config
const PRESET_DEFAULTS = {
  theme: 'monokai',
  lineNumbers: true,
  cursorBlinkRate: 500,
  matchBrackets: true,
  autoCloseBrackets: true,
  styleActiveLine: true,
  mode: 'hcl',
};

interface CodeMirrorSignature {
  Args: {
    Named: {
      /** Called when editor contents change */
      onInput?: (newVal: string) => void;

      /**
       * See documentation for codemirror configuration types:
       * https://codemirror.net/doc/manual.html#config
       * */
      options?: codemirror.EditorConfiguration;

      /** Code contents to display in editor */
      value: string;
    };
    Positional: never;
  };
}

function cleanup(instance: CodeMirrorModifier) {
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
 * The supported themes are: monokai
 *
 * Sample usage:
 * ```
 * <div
 *   {{code-mirror onInput=@onInput options=@options value=@value}}
 * />
 * ```
 *
 * @class CodeMirrorModifier
 *
 */
export default class CodeMirrorModifier extends Modifier<CodeMirrorSignature> {
  didSetup = false;

  editor!: codemirror.Editor;
  element!: HTMLElement;

  // Codemirror does not render if it's not visible so we'll watch for the
  // element's visibility to enter the viewport and refresh it. This is helpful
  // in the case of codemirror being in a tab that is not immediately visible.
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          this.editor?.refresh();
        }
      });
    },
    { rootMargin: '0px', threshold: 1.0 }
  );
  onInput!: CodeMirrorSignature['Args']['Named']['onInput'];

  constructor(owner: Owner, args: ArgsFor<CodeMirrorSignature>) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  modify(
    element: HTMLElement,
    positional: PositionalArgs<CodeMirrorSignature>,
    named: NamedArgs<CodeMirrorSignature>
  ): void {
    assert('CodeMirror must have an element', element);

    if (!this.didSetup) {
      this.#setup(element, positional, named);
      this.didSetup = true;
    }

    this.#update(element, positional, named);
  }

  #setup(
    element: HTMLElement,
    _positional: PositionalArgs<CodeMirrorSignature>,
    named: NamedArgs<CodeMirrorSignature>
  ) {
    const { onInput, options = {}, value } = named;

    this.onInput = onInput;
    this.editor = codemirror(element, {
      ...PRESET_DEFAULTS,
      ...options,
      value,
    });
    this.element = element;
    this.editor.on('change', this.onChange.bind(this));
    this.observer.observe(element);
  }

  onChange(editor: codemirror.Editor) {
    const newVal = editor.getValue();
    this.onInput && this.onInput(newVal);
  }

  #update(
    _element: HTMLElement,
    _positional: PositionalArgs<CodeMirrorSignature>,
    named: NamedArgs<CodeMirrorSignature>
  ) {
    const { value } = named;

    if (this?.editor?.getValue() !== value) {
      this.editor?.setValue(value);
    }
  }
}
