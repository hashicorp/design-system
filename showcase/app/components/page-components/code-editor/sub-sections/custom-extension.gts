/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { keymap } from '@hashicorp/design-system-components/codemirror';

import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsCodeEditor } from '@hashicorp/design-system-components/components';

import type { EditorView } from '@hashicorp/design-system-components/codemirror';

const insertCodeSnippet = (view: EditorView) => {
  view.dispatch({
    changes: {
      from: view.state.selection.main.head,
      insert: '// This is a custom inserted snippet\n',
    },
  });

  return true;
};

const codeSnippetKeymap = keymap.of([
  {
    key: 'Ctrl-Shift-h',
    run: insertCodeSnippet,
  },
]);

export default class SubSectionCustomExtension extends Component {
  customExtensions = [codeSnippetKeymap];

  <template>
    <ShwTextH2>Custom Extension</ShwTextH2>

    <HdsCodeEditor @customExtensions={{this.customExtensions}} as |CE|>
      <CE.Title>Code editor with custom extension</CE.Title>
      <CE.Description>
        This extension will listen for a specific key combination (<code
        >Ctrl-Shift-h</code>
        ) and insert a predefined snippet of code at the current cursor
        position.
      </CE.Description>
    </HdsCodeEditor>
  </template>
}
