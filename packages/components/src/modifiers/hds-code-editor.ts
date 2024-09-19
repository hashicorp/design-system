/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import Modifier from 'ember-modifier';
import type { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';
import {
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
  EditorView,
} from '@codemirror/view';
import { EditorState } from '@codemirror/state';

interface HdsCodeEditorSignature {
  Args: {
    Named: {
      /** Called when editor contents change */
      onInput?: (newVal: string) => void;

      /** Called when editor loses focus */
      onBlur?: (editor: EditorView, event: FocusEvent) => void;

      /**
       * See documentation for codemirror configuration types:
       * https://codemirror.net/doc/manual.html#config
       * */
      // options?: codemirror.EditorConfiguration;

      /** Code contents to display in editor */
      value: string;
    };
  };
}

function cleanup(instance: HdsCodeEditorModifier) {
  const { editor, element, observer, onChange } = instance;
  // editor.off('change', onChange);
  observer.unobserve(element);
}

/**
 *
 * `HdsCodeEditor` implements a modifier that creates a HdsCodeEditor instance on the
 * provided element.
 *
 * The supported modes for the editor are currently: hcl, shell, go, javascript
 * The supported themes are: monokai
 *
 * Sample usage:
 * ```
 * <div
 *   {{hds-code-editor onInput=@onInput options=@options value=@value}}
 * />
 * ```
 *
 * @class HdsCodeEditorModifier
 *
 */
export default class HdsCodeEditorModifier extends Modifier<HdsCodeEditorSignature> {
  didSetup = false;

  editor!: EditorView;
  element!: HTMLElement;

  // Codemirror does not render if it's not visible so we'll watch for the
  // element's visibility to enter the viewport and refresh it. This is helpful
  // in the case of codemirror being in a tab that is not immediately visible.
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          // this.editor?.refresh();
        }
      });
    },
    { rootMargin: '0px', threshold: 1.0 }
  );
  onInput!: HdsCodeEditorSignature['Args']['Named']['onInput'];

  onBlur!: HdsCodeEditorSignature['Args']['Named']['onBlur'];

  constructor(owner: unknown, args: ArgsFor<HdsCodeEditorSignature>) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  modify(
    element: HTMLElement,
    positional: PositionalArgs<HdsCodeEditorSignature>,
    named: NamedArgs<HdsCodeEditorSignature>
  ): void {
    assert('HdsCodeEditor must have an element', element);

    if (!this.didSetup) {
      this.#setup(element, positional, named);
      this.didSetup = true;
    }

    this.#update(element, positional, named);
  }

  #setup(
    element: HTMLElement,
    _positional: PositionalArgs<HdsCodeEditorSignature>,
    named: NamedArgs<HdsCodeEditorSignature>
  ) {
    const {
      onInput,
      onBlur,
      // options = {},
      value,
    } = named;
    const extensions = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      drawSelection(),
      highlightActiveLine(),
      // EditorState.readOnly.of(true),
    ];
    const state = EditorState.create({ doc: value, extensions });
    this.onInput = onInput;
    this.onBlur = onBlur;
    this.editor = new EditorView({ state: state, parent: element });
    this.element = element;
  }

  onChange(editor: EditorView) {
    // const newVal = editor.getValue();
    // this.onInput && this.onInput(newVal);
  }

  #update(
    _element: HTMLElement,
    _positional: PositionalArgs<HdsCodeEditorSignature>,
    named: NamedArgs<HdsCodeEditorSignature>
  ) {
    const { value } = named;

    // if (this?.editor?.getValue() !== value) {
    //   this.editor?.setValue(value);
    // }
  }
}
