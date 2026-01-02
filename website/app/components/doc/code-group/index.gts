/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { CodeBlock } from 'ember-shiki';
import { tracked } from '@glimmer/tracking';
import { notEq, eq } from 'ember-truth-helpers';

import DocCodeGroupActionBar from 'website/components/doc/code-group/action-bar';
import DocCodeGroupExpandButton from 'website/components/doc/code-group/expand-button';
import DocCodeGroupLanguagePicker from 'website/components/doc/code-group/language-picker';
import DocCopyButton from 'website/components/doc/copy-button';
import DynamicTemplate from 'website/components/dynamic-template';

interface DocCodeGroupSignature {
  Args: {
    compactGtsSnippet?: string;
    filename?: string;
    gtsSnippet?: string;
    hbsSnippet?: string;
    hidePreview?: boolean;
    jsSnippet?: string;
  };
  Blocks: {
    default: [];
  };
}

// Helper to undo code escaping for display
const unescapeCode = (code: string) => {
  return code.replace(/\\n/g, '\n');
};

export default class DocCodeGroup extends Component<DocCodeGroupSignature> {
  @tracked currentView = 'hbs';
  @tracked isExpanded = false;

  get hbsSnippet() {
    return unescapeCode(this.args.hbsSnippet ?? '');
  }

  get gtsSnippet() {
    return unescapeCode(this.args.gtsSnippet ?? '');
  }

  get jsSnippet() {
    return unescapeCode(this.args.jsSnippet ?? '');
  }

  get compactGtsSnippet() {
    return unescapeCode(this.args.compactGtsSnippet ?? '');
  }

  get languageOptions() {
    const options = [];

    if (this.args.hbsSnippet !== '') {
      options.push({ label: '.hbs', value: 'hbs' });
    }
    if (this.args.jsSnippet !== '') {
      options.push({ label: '.js', value: 'js' });
    }
    if (this.args.gtsSnippet !== '') {
      options.push({ label: '.gts', value: 'gts' });
    }
    return options;
  }

  get syntaxHighlightLanguage() {
    // to display the compact gts snippet correctly, need to use hbs syntax highlighting
    if (this.currentView === 'gts' && this.isExpanded) {
      return 'gts';
    }

    if (this.currentView === 'js') {
      return 'js';
    }

    return 'hbs';
  }

  get currentViewSnippet() {
    if (this.currentView === 'js') {
      return this.jsSnippet;
    }

    if (this.currentView === 'gts') {
      if (this.isExpanded) {
        return this.gtsSnippet;
      }

      return this.compactGtsSnippet;
    }

    return this.hbsSnippet;
  }

  handleLanguageChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.currentView = input.value;
    }
  };

  handleExpandClick = () => {
    this.isExpanded = !this.isExpanded;
  };

  <template>
    <div class="doc-code-group">
      <DocCodeGroupActionBar>
        <:primary>
          <DocCodeGroupLanguagePicker
            @currentLanguage={{this.currentView}}
            @options={{this.languageOptions}}
            @onLanguageChange={{this.handleLanguageChange}}
          />
        </:primary>
        <:secondary>
          <div class="doc-code-group__copy-button-container">
            <DocCopyButton
              @textToCopy={{this.currentViewSnippet}}
              @type="icon-only"
              class="doc-code-group__copy-button"
            />
          </div>
        </:secondary>
      </DocCodeGroupActionBar>
      {{#if (notEq @hidePreview "true")}}
        <div class="doc-code-group__preview">
          <DynamicTemplate
            @templateString={{this.hbsSnippet}}
            @componentId={{@filename}}
          />
        </div>
      {{/if}}
      <div
        class="doc-code-group__code-snippet-wrapper
          {{if
            (eq this.currentView 'gts')
            'doc-code-group__code-snippet--has-footer'
            ''
          }}"
      >
        <CodeBlock
          @code={{this.currentViewSnippet}}
          @language={{this.syntaxHighlightLanguage}}
          @theme="github-dark"
          @showCopyButton={{false}}
        />
        {{#if (eq this.currentView "gts")}}
          <div class="doc-code-group__code-snippet-footer">
            <DocCodeGroupExpandButton
              @isExpanded={{this.isExpanded}}
              @onToggleExpand={{this.handleExpandClick}}
            />
          </div>
        {{/if}}
      </div>
    </div>
  </template>
}
