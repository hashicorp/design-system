/**
 * Copyright IBM Corp. 2021, 2026
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
import type FastbootService from 'ember-cli-fastboot/services/fastboot';

import DocCodeGroupActionBar from 'website/components/doc/code-group/action-bar';
import DocCodeGroupExpandButton from 'website/components/doc/code-group/expand-button';
import DocCodeGroupLanguagePicker from 'website/components/doc/code-group/language-picker';
import DocCopyButton from 'website/components/doc/copy-button';
import DynamicTemplate from 'website/components/dynamic-template';

interface DocCodeGroupSignature {
  Args: {
    filename?: string;
    gtsFilename?: string;
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
  @service declare readonly fastboot: FastbootService;

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

    if (!this.fastboot.isFastBoot) {
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

  // NOTE: the dynamic template requires an Ember component to render a preview. If there is not a component (ex. only a sass/yaml/bash snippet), we hide the preview by default.
  get hidePreview() {
    if (this.args.hidePreview === 'true') {
      return true;
    }

    const hasHbsPreview = this.hasSnippet(this.args.hbsSnippet);
    const hasGtsPreview =
      this.hasSnippet(this.args.gtsSnippet) && !!this.gtsPreviewComponentId;

    return !(hasHbsPreview || hasGtsPreview);
  }

  private hasSnippet(snippet?: string) {
    return !!snippet && snippet !== '';
  }

  get classicPreviewComponentId() {
    return this.hasSnippet(this.args.filename) ? this.args.filename : undefined;
  }

  get gtsPreviewComponentId() {
    return this.hasSnippet(this.args.gtsFilename)
      ? this.args.gtsFilename
      : undefined;
  }

  get previewMode() {
    if (
      this.currentView === 'gts' &&
      this.hasSnippet(this.args.gtsSnippet) &&
      this.gtsPreviewComponentId
    ) {
      return 'component-module';
    }

    if (
      (this.currentView === 'hbs' || this.currentView === 'js') &&
      this.hasSnippet(this.args.hbsSnippet)
    ) {
      return 'runtime-template';
    }

    return null;
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

  get previewTemplateString() {
    return this.previewMode === 'runtime-template'
      ? this.hbsSnippet
      : undefined;
  }

  get previewComponentId() {
    if (this.previewMode === 'component-module') {
      return this.gtsPreviewComponentId;
    }

    if (this.previewMode === 'runtime-template') {
      return this.classicPreviewComponentId;
    }

    return undefined;
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
    return (
      this.hasSnippet(this.args.hbsSnippet) &&
      this.hasSnippet(this.args.gtsSnippet)
    );
  }

  get languageOptions() {
    const options: Array<LanguageOption> = [];

    if (this.hasSnippet(this.args.hbsSnippet)) {
      options.push({ label: '.hbs', value: 'hbs' });
    }

    if (this.hasSnippet(this.args.jsSnippet)) {
      options.push({ label: '.js', value: 'js' });
    }

    if (this.hasSnippet(this.args.gtsSnippet)) {
      options.push({ label: '.gts', value: 'gts' });
    }

    if (this.args.customLang && this.hasSnippet(this.args.customSnippet)) {
      options.push({ label: `.${this.args.customLang}`, value: 'custom' });
    }

    return options;
  }

  private getStoredLanguage() {
    if (this.fastboot.isFastBoot) {
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
    if (this.fastboot.isFastBoot) {
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
            @templateString={{this.previewTemplateString}}
            @componentId={{this.previewComponentId}}
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
        {{#if this.fastboot.isFastBoot}}
          <pre><code>{{this.currentSnippet.snippet}}</code></pre>
        {{else}}
          <CodeBlock
            @code={{this.currentSnippet.snippet}}
            @language={{this.currentSnippet.language}}
            @theme="github-dark"
            @showCopyButton={{false}}
          />
        {{/if}}
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
