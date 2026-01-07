/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { CodeBlock } from 'ember-shiki';
import { tracked } from '@glimmer/tracking';
import { notEq } from 'ember-truth-helpers';
import type Owner from '@ember/owner';

import DocCodeGroupActionBar from 'website/components/doc/code-group/action-bar';
import DocCodeGroupExpandButton from 'website/components/doc/code-group/expand-button';
import DocCodeGroupLanguagePicker from 'website/components/doc/code-group/language-picker';
import DocCopyButton from 'website/components/doc/copy-button';
import DynamicTemplate from 'website/components/dynamic-template';

interface DocCodeGroupSignature {
  Args: {
    filename?: string;
    hbsSnippet?: string;
    jsSnippet?: string;
    gtsSnippet?: string;
    compactGtsSnippet?: string;
    customSnippet?: string;
    customLang?: string;
    hidePreview?: 'true' | 'false';
    isExpanded?: 'true' | 'false';
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

  constructor(owner: Owner, args: DocCodeGroupSignature['Args']) {
    super(owner, args);

    if (args.hbsSnippet !== '') {
      this.currentView = 'hbs';
    } else if (args.jsSnippet !== '') {
      this.currentView = 'js';
    } else if (args.gtsSnippet !== '') {
      this.currentView = 'gts';
    } else if (args.customSnippet !== '') {
      this.currentView = 'custom';
    }

    if (args.isExpanded === 'true') {
      this.isExpanded = true;
    }
  }

  // NOTE: the dynamic template component can only render "classic" components, so if there is no hbs snippet, we hide the preview. This can be removed when implement: https://hashicorp.atlassian.net/browse/HDS-5833
  get hidePreview() {
    const { hbsSnippet, hidePreview } = this.args;
    if (hbsSnippet === '') {
      return true;
    }

    return hidePreview === 'true';
  }

  get hbsSnippet() {
    const { hbsSnippet } = this.args;
    return hbsSnippet ? unescapeCode(hbsSnippet) : '';
  }

  get gtsSnippet() {
    const { gtsSnippet } = this.args;
    return gtsSnippet ? unescapeCode(gtsSnippet) : '';
  }

  get jsSnippet() {
    const { jsSnippet } = this.args;
    return jsSnippet ? unescapeCode(jsSnippet) : '';
  }

  get compactGtsSnippet() {
    const { compactGtsSnippet } = this.args;
    return compactGtsSnippet ? unescapeCode(compactGtsSnippet) : '';
  }

  get customSnippet() {
    const { customSnippet } = this.args;
    return customSnippet ? unescapeCode(customSnippet) : '';
  }

  get languageOptions() {
    const { hbsSnippet, jsSnippet, gtsSnippet, customLang, customSnippet } =
      this.args;

    const options = [];

    if (hbsSnippet !== '') {
      options.push({ label: '.hbs', value: 'hbs' });
    }

    if (jsSnippet !== '') {
      options.push({ label: '.js', value: 'js' });
    }

    if (gtsSnippet !== '') {
      options.push({ label: '.gts', value: 'gts' });
    }

    if (customLang && customSnippet !== '') {
      options.push({ label: `.${customLang}`, value: 'custom' });
    }

    return options;
  }

  get syntaxHighlightLanguage() {
    // to display the compact gts snippet correctly, need to use hbs syntax highlighting instead of gts
    if (this.currentView === 'gts' && this.isExpanded) {
      return 'gts';
    }

    if (this.currentView === 'js') {
      return 'js';
    }

    if (this.currentView === 'custom') {
      return this.args.customLang || 'text';
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

    if (this.currentView === 'custom') {
      return this.customSnippet;
    }

    return this.hbsSnippet;
  }

  get hasFooter() {
    return this.currentView === 'gts';
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
      {{#if (notEq this.hidePreview true)}}
        <div class="doc-code-group__preview">
          <DynamicTemplate
            @templateString={{this.hbsSnippet}}
            @componentId={{@filename}}
          />
        </div>
      {{/if}}
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
      <div
        class="doc-code-group__code-snippet-wrapper
          {{if this.hasFooter 'doc-code-group__code-snippet--has-footer' ''}}"
      >
        <CodeBlock
          @code={{this.currentViewSnippet}}
          @language={{this.syntaxHighlightLanguage}}
          @theme="github-dark"
          @showCopyButton={{false}}
        />
        {{#if this.hasFooter}}
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
