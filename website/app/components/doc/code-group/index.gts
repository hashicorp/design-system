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

import { HdsIcon } from '@hashicorp/design-system-components/components';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

import DynamicTemplate from 'website/components/dynamic-template';
import docClipboard from 'website/modifiers/doc-clipboard';

interface DocCodeGroupSignature {
  Args: {
    filename?: string;
    hbsSnippet: string;
    gtsSnippet: string;
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
  @tracked copyStatus = 'idle';
  @tracked copyTimer: ReturnType<typeof setTimeout> | undefined;
  @tracked copyIconName: HdsIconSignature['Args']['name'] = 'clipboard-copy';
  @tracked expandIconName: HdsIconSignature['Args']['name'] = 'unfold-open';

  componentId = guidFor(this);

  get unescapedHbsSnippet() {
    return unescapeCode(this.args.hbsSnippet);
  }

  get unescapedGtsSnippet() {
    return unescapeCode(this.args.gtsSnippet);
  }

  get gtsSnippet() {
    if (this.isExpanded) {
      return this.unescapedGtsSnippet;
    }

    // When not expanded, show a short GTS-like version of the HBS snippet
    return this.unescapedHbsSnippet.replace(/::/g, '').trim();
  }

  get toggleButtonLabel() {
    return this.isExpanded ? 'Collapse code' : 'Expand code';
  }

  get language() {
    if (this.currentView === 'gts' && this.isExpanded) {
      return 'gts';
    }

    return 'hbs';
  }

  get currentViewSnippet() {
    return this.currentView === 'hbs'
      ? this.unescapedHbsSnippet
      : this.gtsSnippet;
  }

  get copyButtonLabel() {
    let label;
    switch (this.copyStatus) {
      case 'success':
        label = 'Copied';
        break;
      case 'error':
        label = 'Error';
        break;
      default:
        label = 'Copy';
        break;
    }
    return label;
  }

  get copyButtonClassNames() {
    const classNames = ['doc-code-group__copy-button'];
    if (this.copyStatus === 'success') {
      classNames.push('doc-code-group__copy-button--status-success');
    } else if (this.copyStatus === 'error') {
      classNames.push('doc-code-group__copy-button--status-error');
    }
    return classNames.join(' ');
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

  onSuccess = () => {
    this.copyStatus = 'success';
    this.copyIconName = 'clipboard-checked';
    this.resetStatusDelayed();
  };

  onError = () => {
    this.copyStatus = 'error';
    this.copyIconName = 'alert-triangle';
    this.resetStatusDelayed();
  };

  resetStatusDelayed() {
    clearTimeout(this.copyTimer);
    // make it fade back to the default state
    this.copyTimer = setTimeout(() => {
      this.copyStatus = 'idle';
      this.copyIconName = 'clipboard-copy';
    }, 2000);
  }

  <template>
    <div class="doc-code-group">
      <div class="doc-code-group__action-bar">
        <fieldset
          class="doc-code-group__language-picker"
          aria-label="Code language"
        >
          <label class="doc-code-group__language-picker-option">
            <span>.hbs</span>
            <input
              type="radio"
              class="sr-only"
              name="language-picker-{{this.componentId}}"
              value="hbs"
              checked={{eq this.currentView "hbs"}}
              {{on "change" this.handleLanguageChange}}
            />
          </label>
          <label class="doc-code-group__language-picker-option">
            <span>.gts</span>
            <input
              type="radio"
              class="sr-only"
              name="language-picker-{{this.componentId}}"
              value="gts"
              checked={{eq this.currentView "gts"}}
              {{on "change" this.handleLanguageChange}}
            />
          </label>
        </fieldset>
        <div class="doc-code-group__secondary-actions">
          <div class="doc-code-group__copy-button-container">
            <button
              type="button"
              aria-label={{this.copyButtonLabel}}
              class={{this.copyButtonClassNames}}
              {{docClipboard
                text=this.currentViewSnippet
                onSuccess=this.onSuccess
                onError=this.onError
              }}
            >
              <HdsIcon @name={{this.copyIconName}} />
            </button>
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
      <div class="doc-code-block__code-snippet-wrapper">
        {{#if (eq this.currentView "gts")}}
          <button
            type="button"
            class="doc-code-group__expand-button"
            {{on "click" this.handleGtsExpandClick}}
            aria-label={{this.toggleButtonLabel}}
            aria-expanded={{this.isExpanded}}
          >
            <HdsIcon @name={{this.expandIconName}} />
          </button>
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
