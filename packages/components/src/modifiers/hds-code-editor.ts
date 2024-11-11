/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { assert } from '@ember/debug';
import Modifier from 'ember-modifier';
import {
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
  EditorView,
} from '@codemirror/view';
import { EditorState, type Extension } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';

import type { PositionalArgs, NamedArgs } from 'ember-modifier';
import type { HdsCodeEditorLanguages } from 'src/types/hds-code-editor.types';

const LANGUAGE_MAP: Record<HdsCodeEditorLanguages, Extension> = {
  javascript: javascript(),
};

export interface HdsCodeEditorSignature {
  Args: {
    Named: {
      language?: HdsCodeEditorLanguages;

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
      language,
      value,
    } = named;

    const languageExtension =
      language !== undefined ? LANGUAGE_MAP[language] : undefined;

    const hdsDark = EditorView.theme(
      {
        '&': {
          color: 'white',
          backgroundColor: '#0d0e12',
        },
      },
      { dark: true }
    );

    let extensions = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      drawSelection(),
      highlightActiveLine(),
      hdsDark,
    ];

    if (languageExtension !== undefined) {
      extensions = [languageExtension, ...extensions];
    }

    const state = EditorState.create({ doc: value, extensions });

    this.onInput = onInput;
    this.onBlur = onBlur;

    this.editor = new EditorView({ state, parent: element });
    this.element = element;
  }
}
