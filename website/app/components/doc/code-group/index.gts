/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { CodeBlock } from 'ember-shiki';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { notEq, eq } from 'ember-truth-helpers';
import { guidFor } from '@ember/object/internals';
import type Owner from '@ember/owner';
import { modifier } from 'ember-modifier';

import { HdsIcon } from '@hashicorp/design-system-components/components';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

import DynamicTemplate from 'website/components/dynamic-template';
import DocCodeGroupCopyButton from 'website/components/doc/code-group/copy-button';

interface DocCodeGroupSignature {
  Args: {
    filename?: string;
    hbsSnippet?: string;
    gtsSnippet?: string;
    jsSnippet?: string;
    hidePreview?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

// Helper to undo code escaping for display
const unescapeCode = (code: string) => {
  return code.replace(/\\n/g, '\n');
};

export default class DocCodeGroup extends Component<DocCodeGroupSignature> {
  @tracked currentView = 'hbs';
  @tracked isExpanded = false;
  @tracked expandIconName: HdsIconSignature['Args']['name'] = 'unfold-open';

  componentId = guidFor(this);
  codeSnippetWrapperElement!: HTMLDivElement;

  constructor(owner: Owner, args: DocCodeGroupSignature['Args']) {
    super(owner, args);
    if (this.args.gtsSnippet === '' && this.args.hbsSnippet === '') {
      this.currentView = 'js';
    }
  }

  registerCodeSnippetWrapper = modifier((element: HTMLDivElement) => {
    this.codeSnippetWrapperElement = element;
  });

  get unescapedHbsSnippet() {
    return unescapeCode(this.args.hbsSnippet ?? '');
  }

  get unescapedGtsSnippet() {
    return unescapeCode(this.args.gtsSnippet ?? '');
  }

  get unescapedJsSnippet() {
    return unescapeCode(this.args.jsSnippet ?? '');
  }

  get shortenedGtsSnippet() {
    if (!this.args.gtsSnippet) {
      return '';
    }

    // find the content within the <template> tags
    const templateRegex = /<template>([\s\S]*?)<\/template>/;
    const match = this.unescapedGtsSnippet.match(templateRegex);

    if (!match?.[1]) {
      return '';
    }

    let snippet = match[1];

    // Remove leading and trailing blank lines
    snippet = snippet.replace(/^\s*\n/, '').replace(/\n\s*$/, '');

    // Find the minimum indentation level (excluding empty lines)
    const lines = snippet.split('\n');
    const nonEmptyLines = lines.filter((line) => line.trim().length > 0);

    if (nonEmptyLines.length === 0) {
      return '';
    }

    const minIndent = Math.min(
      ...nonEmptyLines.map((line) => {
        const match = line.match(/^(\s*)/);
        return match?.[1]?.length ?? 0;
      }),
    );

    // Remove the minimum indentation from all lines
    const dedentedLines = lines.map((line) => {
      if (line.trim().length === 0) {
        return ''; // Keep empty lines empty
      }
      return line.slice(minIndent);
    });

    return dedentedLines.join('\n');
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

  get gtsSnippet() {
    if (this.isExpanded) {
      return this.unescapedGtsSnippet;
    }

    // When not expanded, show just the content inside the <template> tags
    return this.shortenedGtsSnippet;
  }

  get toggleButtonLabel() {
    return this.isExpanded ? 'Collapse .gts snippet' : 'Expand .gts snippet';
  }

  get language() {
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
      return this.unescapedJsSnippet;
    }
    return this.currentView === 'hbs'
      ? this.unescapedHbsSnippet
      : this.gtsSnippet;
  }

  handleGtsExpandClick = () => {
    this.isExpanded = !this.isExpanded;
    this.expandIconName = this.isExpanded ? 'unfold-close' : 'unfold-open';
  };

  handleLanguageChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.currentView = input.value;
    }
  };

  <template>
    <div class="doc-code-group">
      <div class="doc-code-group__action-bar">
        <fieldset
          class="doc-code-group__language-picker"
          aria-label="Code language"
        >
          {{#each this.languageOptions as |option|}}
            <label class="doc-code-group__language-picker-option">
              <span>{{option.label}}</span>
              <input
                type="radio"
                class="sr-only"
                name="language-picker-{{this.componentId}}"
                value="{{option.value}}"
                checked={{eq this.currentView option.value}}
                {{on "change" this.handleLanguageChange}}
              />
            </label>
          {{/each}}
        </fieldset>
        <div class="doc-code-group__secondary-actions">
          <div class="doc-code-group__copy-button-container">
            <DocCodeGroupCopyButton @textToCopy={{this.currentViewSnippet}} />
          </div>
        </div>
      </div>
      {{#if (notEq @hidePreview "true")}}
        <div class="doc-code-group__preview">
          <DynamicTemplate
            @templateString={{this.unescapedHbsSnippet}}
            @componentId={{@filename}}
          />
        </div>
      {{/if}}
      <div
        class="doc-code-group__code-snippet-wrapper"
        {{this.registerCodeSnippetWrapper}}
      >
        {{#if (eq this.currentView "gts")}}
          <div class="doc-code-group__expand-button-container">
            <button
              type="button"
              class="doc-code-group__expand-button"
              {{on "click" this.handleGtsExpandClick}}
              aria-expanded={{this.isExpanded}}
            >
              <HdsIcon @name={{this.expandIconName}} />
              <span>
                {{this.toggleButtonLabel}}
              </span>
            </button>
          </div>
        {{/if}}
        <CodeBlock
          @code={{this.currentViewSnippet}}
          @language={{this.language}}
          @theme="github-dark"
          @showCopyButton={{false}}
        />
      </div>
    </div>
  </template>
}
