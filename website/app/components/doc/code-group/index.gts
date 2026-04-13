/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { registerDestructor } from '@ember/destroyable';
import { CodeBlock } from 'ember-shiki';
import { tracked } from '@glimmer/tracking';
import { notEq } from 'ember-truth-helpers';
import { modifier } from 'ember-modifier';
import { service } from '@ember/service';

import type Owner from '@ember/owner';
import type RouterService from '@ember/routing/router-service';

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

type LanguageOption = { label: string; value: string };

const CODE_GROUP_LANGUAGE_STORAGE_KEY = 'hds-doc-code-group-language';
const CODE_GROUP_LANGUAGE_CHANGE_EVENT = 'hds-doc-code-group-language-change';

// Helper to undo code escaping for display
const unescapeCode = (code: string) => {
  return code.replace(/\\n/g, '\n');
};

export default class DocCodeGroup extends Component<DocCodeGroupSignature> {
  @service declare readonly router: RouterService;

  @tracked currentView = 'hbs';
  @tracked isExpanded = false;

  private readonly handleRouteDidChange = () => {
    if (this.shouldSyncLanguageSelection) {
      this.applyLanguageSelection(this.getStoredLanguage());
    } else {
      this.currentView = this.resolveLanguageSelection(this.currentView);
    }
  };

  private readonly handleStoredLanguageChange = (event: Event) => {
    if (!this.shouldSyncLanguageSelection) {
      return;
    }

    const customEvent = event as CustomEvent<string>;
    this.applyLanguageSelection(customEvent.detail);
  };

  private readonly handleStorageEvent = (event: StorageEvent) => {
    if (
      !this.shouldSyncLanguageSelection ||
      event.key !== CODE_GROUP_LANGUAGE_STORAGE_KEY
    ) {
      return;
    }

    this.applyLanguageSelection(event.newValue);
  };

  constructor(owner: Owner, args: DocCodeGroupSignature['Args']) {
    super(owner, args);

    this.currentView = this.shouldSyncLanguageSelection
      ? this.resolveLanguageSelection(
          this.getStoredLanguage() || this.languageOptions[0]?.value || 'hbs',
        )
      : this.languageOptions[0]?.value || 'hbs';

    if (args.isExpanded === 'true') {
      this.isExpanded = true;
    }

    this.router.on('routeDidChange', this.handleRouteDidChange);

    registerDestructor(this, () => {
      this.router.off('routeDidChange', this.handleRouteDidChange);
    });

    if (typeof window !== 'undefined') {
      // this custom event is used to notify other code group instances on the page that the language selection has changed so that they can update their selected language too
      window.addEventListener(
        CODE_GROUP_LANGUAGE_CHANGE_EVENT,
        this.handleStoredLanguageChange,
      );
      window.addEventListener('storage', this.handleStorageEvent);

      registerDestructor(this, () => {
        window.removeEventListener(
          CODE_GROUP_LANGUAGE_CHANGE_EVENT,
          this.handleStoredLanguageChange,
        );
        window.removeEventListener('storage', this.handleStorageEvent);
      });
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

  get normalizedCurrentRouteName() {
    const path = this.router.currentURL?.split('?')[0] ?? '';
    return path.replace(/^\/+/, '').replace(/\/+$/, '');
  }

  get codeExpandEventName() {
    return `Code Demo Snippet Expanded - ${this.normalizedCurrentRouteName}`;
  }

  getCodeLanguageEventName = (value: string) => {
    return `Code Demo Language Tab Selected - ${this.normalizedCurrentRouteName} - ${value}`;
  };

  get shouldSyncLanguageSelection() {
    return this.args.hbsSnippet !== '' && this.args.gtsSnippet !== '';
  }

  get languageOptions() {
    const options: Array<LanguageOption> = [];

    if (this.args.hbsSnippet !== '') {
      options.push({ label: '.hbs', value: 'hbs' });
    }

    if (this.args.jsSnippet !== '') {
      options.push({ label: '.js', value: 'js' });
    }

    if (this.args.gtsSnippet !== '') {
      options.push({ label: '.gts', value: 'gts' });
    }

    if (this.args.customLang && this.args.customSnippet !== '') {
      options.push({ label: `.${this.args.customLang}`, value: 'custom' });
    }

    return options;
  }

  private getStoredLanguage() {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      return window.localStorage.getItem(CODE_GROUP_LANGUAGE_STORAGE_KEY);
    } catch (err) {
      console.warn('Failed to access localStorage:', err);
      return null;
    }
  }

  private resolveLanguageSelection(value?: string | null) {
    if (!value) {
      return this.languageOptions[0]?.value || 'hbs';
    }

    return this.languageOptions.some((option) => option.value === value)
      ? value
      : this.languageOptions[0]?.value || 'hbs';
  }

  private applyLanguageSelection(value?: string | null) {
    this.currentView = this.resolveLanguageSelection(value);
  }

  private persistLanguageSelection(value: string) {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(CODE_GROUP_LANGUAGE_STORAGE_KEY, value);
    window.dispatchEvent(
      new CustomEvent(CODE_GROUP_LANGUAGE_CHANGE_EVENT, {
        detail: value,
      }),
    );
  }

  handleLanguageChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      if (this.shouldSyncLanguageSelection) {
        this.persistLanguageSelection(input.value);
      } else {
        this.currentView = input.value;
      }
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
            @getEventName={{this.getCodeLanguageEventName}}
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
              @eventName={{this.codeExpandEventName}}
            />
          </div>
        {{/if}}
      </div>
    </div>
  </template>
}
