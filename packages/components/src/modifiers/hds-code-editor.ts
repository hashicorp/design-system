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
  keymap,
} from '@codemirror/view';
import { EditorState, type Extension } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { sql } from '@codemirror/lang-sql';
import { go } from '@codemirror/lang-go';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import {
  syntaxHighlighting,
  // temporarily use the default highlight style until we have a custom one
  defaultHighlightStyle,
} from '@codemirror/language';
import hdsDarkTheme from './hds-code-editor/themes/hds-dark-theme.ts';
import type { PositionalArgs, NamedArgs } from 'ember-modifier';
import type { HdsCodeEditorLanguages } from 'src/types/hds-code-editor.types';

const LANGUAGE_MAP: Record<HdsCodeEditorLanguages, Extension> = {
  go: go(),
  javascript: javascript(),
  json: json(),
  sql: sql(),
};

export interface HdsCodeEditorSignature {
  Args: {
    Named: {
      language?: HdsCodeEditorLanguages;
      value: string;
      onInput?: (newVal: string) => void;
      onBlur?: (editor: EditorView, event: FocusEvent) => void;
    };
  };
}

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

    let extensions = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      drawSelection(),
      highlightActiveLine(),
      hdsDarkTheme,
      keymap.of([...defaultKeymap, ...historyKeymap]),
      syntaxHighlighting(defaultHighlightStyle),
      history(),
    ];

    if (languageExtension !== undefined) {
      extensions = [languageExtension, ...extensions];
    }

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    this.onInput = onInput;
    this.onBlur = onBlur;

    this.editor = new EditorView({ state, parent: element });
    this.element = element;
  }
}
