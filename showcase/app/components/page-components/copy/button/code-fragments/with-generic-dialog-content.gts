/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsCopyButton,
  HdsFormTextInputBase,
} from '@hashicorp/design-system-components/components';

import ShwDivider from 'showcase/components/shw/divider';

export interface CodeFragmentWithGenericDialogContentSignature {
  Element: HTMLDivElement;
}

const CodeFragmentWithGenericDialogContent: TemplateOnlyComponent<CodeFragmentWithGenericDialogContentSignature> =
  <template>
    <div class="shw-component-copy-button-demo-container">
      <p class="shw-text-h4">With HDS components</p>
      <p class="shw-text-body">Input</p>
      <div class="shw-component-copy-button-demo-flex-container">
        <HdsFormTextInputBase
          name="test-dropdown-text-input"
          id="test-dropdown-text-input"
          @value="Lorem ipsum dolor"
        />
        <HdsCopyButton
          @isIconOnly={{true}}
          @text="Copy the text input value"
          @targetToCopy="#test-dropdown-text-input"
        />
      </div>
      <ShwDivider @level={{2}} />
      <p class="shw-text-h4">With HTML blocks</p>
      <p class="shw-text-body">Structured content</p>
      <div class="shw-component-copy-button-demo-flex-container">
        <p
          class="shw-component-copy-button-demo-paragraph"
          id="test-dropdown-structured-content"
        >This is the
          <span><strong>some</strong>
            <em>structured</em></span>
          content that will be
          <a href="#">targeted</a>
          by the
          <code>button</code>.</p>
        <HdsCopyButton
          @isIconOnly={{true}}
          @text="Copy the structured content"
          @targetToCopy="#test-dropdown-structured-content"
        />
      </div>
      <p class="shw-text-body">Code block with 'contentEditable'</p>
      <div class="shw-component-copy-button-demo-flex-container">
        <pre class="shw-component-copy-button-code-block"><code
            id="test-dropdown-code-block-editable"
            contenteditable="true"
          >&lt;h1&gt;Lorem&lt;/h1&gt; &lt;p&gt;Ipsum dolor&lt;/p&gt;</code></pre>
        <HdsCopyButton
          @isIconOnly={{true}}
          @text="Copy the code block content"
          @targetToCopy="#test-dropdown-code-block-editable"
        />
      </div>
    </div>
  </template>;

export default CodeFragmentWithGenericDialogContent;
