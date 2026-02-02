/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { CodeBlock } from 'ember-shiki';
import { tracked } from '@glimmer/tracking';
import { notEq } from 'ember-truth-helpers';
import { modifier } from 'ember-modifier';
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
  @tracked languageOptions: Array<{ label: string; value: string }> = [];

  constructor(owner: Owner, args: DocCodeGroupSignature['Args']) {
    super(owner, args);

    const options = [];

    if (args.hbsSnippet !== '') {
      options.push({ label: '.hbs', value: 'hbs' });
    }

    if (args.jsSnippet !== '') {
      options.push({ label: '.js', value: 'js' });
    }

    if (args.gtsSnippet !== '') {
      options.push({ label: '.gts', value: 'gts' });
    }

    if (args.customLang && args.customSnippet !== '') {
      options.push({ label: `.${args.customLang}`, value: 'custom' });
    }

    this.languageOptions = options;
    this.currentView = options[0]?.value || 'hbs';

    if (args.isExpanded === 'true') {
      this.isExpanded = true;
    }
  }

  // NOTE: the dynamic template requires a component to render a preview. If there is not a component (ex. only a sass/yaml/bash snippet), we hide the preview by default.
  get hidePreview() {
    // TODO: refactor dynamic template to support gts components: https://hashicorp.atlassian.net/browse/HDS-5833
    return this.args.hbsSnippet === '' || this.args.hidePreview === 'true';
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

  get currentSnippet() {
    if (this.currentView === 'js') {
      return { snippet: this.jsSnippet, language: 'js' };
    }

    if (this.currentView === 'gts') {
      if (this.isExpanded) {
        return { snippet: this.gtsSnippet, language: 'gts' };
      }

      // to display the compact gts snippet correctly, need to use hbs syntax highlighting instead of gts
      return { snippet: this.compactGtsSnippet, language: 'hbs' };
    }

    if (this.currentView === 'custom') {
      return {
        snippet: this.customSnippet,
        language: this.args.customLang || 'text',
      };
    }

    return { snippet: this.hbsSnippet, language: 'hbs' };
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

  // NOTE: we don't have access to the code element inside the CodeBlock component, so we need to set the tabindex using query selectors (need to set tabindex because the code element can be scrollable and it needs to be focusable for keyboard users)
  setCodeElementTabIndex = modifier((element: HTMLDivElement) => {
    element.querySelector('code')?.setAttribute('tabindex', '0');
  });

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
              @type="solid"
              @color="secondary"
              @textToCopy={{this.currentSnippet.snippet}}
              @isIconOnly={{true}}
            />
          </div>
        </:secondary>
      </DocCodeGroupActionBar>
      <div
        class="doc-code-group__code-snippet-wrapper
          {{if this.hasFooter 'doc-code-group__code-snippet--has-footer' ''}}"
        {{this.setCodeElementTabIndex}}
      >
        <CodeBlock
          @code={{this.currentSnippet.snippet}}
          @language={{this.currentSnippet.language}}
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
