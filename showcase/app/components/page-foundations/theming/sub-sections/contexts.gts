import Component from '@glimmer/component';
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { service } from '@ember/service';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';

import { HdsThemeContext } from '@hashicorp/design-system-components/components';

import ShwThemingService from 'showcase/services/shw-theming';
import HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';
import {
  CONTEXTUAL_THEMES,
  CONTEXTUAL_MODES,
} from '@hashicorp/design-system-components/components/hds/theme-context/index';

interface ThemingBasicContainerSignature {
  Args: {
    text?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

interface TheminBasicContainerWithParentSelectorSignature {
  Args: {
    subselector: string;
  };
  Element: ThemingBasicContainerSignature['Element'];
}

const ThemingBasicContainer: TemplateOnlyComponent<ThemingBasicContainerSignature> =
  <template>
    <div class="shw-foundation-theming-basic-container" ...attributes>
      {{#if @text}}
        {{@text}}
      {{else}}
        {{yield}}
      {{/if}}
    </div>
  </template>;

class TheminBasicContainerWithParentSelector extends Component<TheminBasicContainerWithParentSelectorSignature> {
  @service declare readonly shwTheming: ShwThemingService;
  @service declare readonly hdsTheming: HdsThemingService;

  get classSelector() {
    return `hds-theme-${this.args.subselector}`;
  }

  get notAvailable() {
    const isAvailable =
      (this.shwTheming.currentStylesheet === 'prefers-color-scheme' &&
        (this.args.subselector === 'default' ||
          this.args.subselector === 'system')) ||
      (this.shwTheming.currentStylesheet === 'css-selectors' &&
        this.args.subselector !== 'system') ||
      this.shwTheming.currentStylesheet === 'combined-strategies';
    return !isAvailable;
  }

  <template>
    <div class={{this.classSelector}}>
      <ThemingBasicContainer
        class={{if
          this.notAvailable
          "shw-foundation-theming-basic-container--not-available"
        }}
      >
        {{if this.notAvailable "⤫" "TEXT"}}
      </ThemingBasicContainer>
    </div>
  </template>
}

export default class SubSectionContexts extends Component {
  @service declare readonly shwTheming: ShwThemingService;

  get showParentContainerExamples() {
    return (
      this.shwTheming.currentStylesheet === 'prefers-color-scheme' ||
      this.shwTheming.currentStylesheet === 'css-selectors' ||
      this.shwTheming.currentStylesheet === 'combined-strategies'
    );
  }

  get showNestedExamples() {
    return (
      this.shwTheming.currentStylesheet === 'css-selectors' ||
      this.shwTheming.currentStylesheet === 'combined-strategies'
    );
  }

  <template>
    <ShwTextH2>Contextual theming</ShwTextH2>

    <ShwTextH3>Page-level theming</ShwTextH3>

    <ShwTextBody>This example below should update when changing theme</ShwTextBody>

    <ShwFlex as |SF|>
      <SF.Item as |SFI|>
        <SFI.Label>Container with color
          <code>foreground-strong</code>
          / background
          <code>surface-strong</code>
          / font-family
          <code>typography-font-stack-text</code></SFI.Label>
        <ThemingBasicContainer @text="TEXT" />
      </SF.Item>
    </ShwFlex>

    <ShwDivider />

    <ShwTextH3>Local theming via ThemeContext</ShwTextH3>

    <ShwTextBody>These examples below should remain the same even when changing
      theme</ShwTextBody>

    <ShwTextH4>Parent container</ShwTextH4>

    {{#if this.showParentContainerExamples}}
      <ShwGrid
        @gap="4rem"
        @columns={{2}}
        {{style width="fit-content" grid-template-columns="repeat(4, auto)"}}
        as |SG|
      >
        {{#each CONTEXTUAL_THEMES as |theme|}}
          <SG.Item as |SGI|>
            <SGI.Label><code>@context={{theme}}</code></SGI.Label>
            <HdsThemeContext @context={{theme}}>
              <ThemingBasicContainer @text="TEXT" />
            </HdsThemeContext>
          </SG.Item>
        {{/each}}
        {{#each CONTEXTUAL_MODES as |mode|}}
          <SG.Item as |SGI|>
            <SGI.Label><code>@context={{mode}}</code></SGI.Label>
            <HdsThemeContext @context={{mode}}>
              <ThemingBasicContainer @text="TEXT" />
            </HdsThemeContext>
          </SG.Item>
        {{/each}}
      </ShwGrid>
    {{else}}
      <div class="shw-page-foundations-theming-banner-incorrect-stylesheet">
        <ShwTextBody>These examples are visible only if theming is applied via
          "prefers color scheme" or "CSS selectors" or "combined strategies",
          please select a theme below one of these two groups of options in the
          selector at the top of the page</ShwTextBody>
      </div>
    {{/if}}

    <ShwDivider @level={{2}} />

    <ShwTextH4>Nested</ShwTextH4>

    {{#if this.showNestedExamples}}
      <ShwGrid
        @gap="4rem"
        @columns={{3}}
        {{style width="fit-content" grid-template-columns="repeat(3, auto)"}}
        as |SG|
      >
        <SG.Item as |SGI|>
          <SGI.Label><code>@context=light</code>
            &gt;
            <code>@context=dark</code></SGI.Label>
          <HdsThemeContext @context="light">
            <ThemingBasicContainer>
              <HdsThemeContext @context="dark">
                <ThemingBasicContainer @text="TEXT" />
              </HdsThemeContext>
            </ThemingBasicContainer>
          </HdsThemeContext>
        </SG.Item>
        <SG.Item as |SGI|>
          <SGI.Label><code>@context=dark</code>
            &gt;
            <code>@context=light</code></SGI.Label>
          <HdsThemeContext @context="dark">
            <ThemingBasicContainer>
              <HdsThemeContext @context="light">
                <ThemingBasicContainer @text="TEXT" />
              </HdsThemeContext>
            </ThemingBasicContainer>
          </HdsThemeContext>
        </SG.Item>
        <SG.Item as |SGI|>
          <SGI.Label><code>@context=dark</code>
            &gt;
            <code>@context=light</code>
            &gt;
            <code>@context=dark</code></SGI.Label>
          <HdsThemeContext @context="dark">
            <ThemingBasicContainer>
              <HdsThemeContext @context="light">
                <ThemingBasicContainer>
                  <HdsThemeContext @context="dark">
                    <ThemingBasicContainer @text="TEXT" />
                  </HdsThemeContext>
                </ThemingBasicContainer>
              </HdsThemeContext>
            </ThemingBasicContainer>
          </HdsThemeContext>
        </SG.Item>
      </ShwGrid>
    {{else}}
      <div class="shw-page-foundations-theming-banner-incorrect-stylesheet">
        <ShwTextBody>These examples are visible only if theming is applied via
          "CSS selectors" or "combined strategies", please select a theme below
          one of these two groups of options in the selector at the top of the
          page</ShwTextBody>
      </div>
    {{/if}}

    <ShwDivider />

    <ShwTextH3>Local theming via CSS selectors</ShwTextH3>

    <ShwTextBody>These examples below should remain the same even when changing
      theme</ShwTextBody>

    <ShwTextH4>Parent container</ShwTextH4>

    {{#if this.showParentContainerExamples}}
      <ShwGrid
        @gap="4rem"
        @columns={{2}}
        {{style width="fit-content" grid-template-columns="repeat(4, auto)"}}
        as |SG|
      >
        {{#let CONTEXTUAL_THEMES as |themes|}}
          {{#each themes as |theme|}}
            <SG.Item as |SGI|>
              <SGI.Label><code>
                  .hds-theme-{{theme}}
                </code></SGI.Label>
              <TheminBasicContainerWithParentSelector @subselector={{theme}} />
            </SG.Item>
          {{/each}}
        {{/let}}
      </ShwGrid>
    {{else}}
      <div class="shw-page-foundations-theming-banner-incorrect-stylesheet">
        <ShwTextBody>These examples are visible only if theming is applied via
          "prefers color scheme" or "CSS selectors" or "combined strategies",
          please select a theme below one of these two groups of options in the
          selector at the top of the page</ShwTextBody>
      </div>
    {{/if}}

    <ShwDivider @level={{2}} />

    <ShwTextH4>Nested</ShwTextH4>

    {{#if this.showNestedExamples}}
      <ShwGrid
        @gap="4rem"
        @columns={{3}}
        {{style width="fit-content" grid-template-columns="repeat(3, auto)"}}
        as |SG|
      >
        <SG.Item as |SGI|>
          <SGI.Label><code>.hds-theme-light</code>
            &gt;
            <code>.hds-theme-dark</code></SGI.Label>
          <div class="hds-theme-light">
            <ThemingBasicContainer>
              <div class="hds-theme-dark">
                <ThemingBasicContainer @text="TEXT" />
              </div>
            </ThemingBasicContainer>
          </div>
        </SG.Item>
        <SG.Item as |SGI|>
          <SGI.Label><code>.hds-theme-dark</code>
            &gt;
            <code>.hds-theme-light</code></SGI.Label>
          <div class="hds-theme-dark">
            <ThemingBasicContainer>
              <div class="hds-theme-light">
                <ThemingBasicContainer @text="TEXT" />
              </div>
            </ThemingBasicContainer>
          </div>
        </SG.Item>
        <SG.Item as |SGI|>
          <SGI.Label><code>.hds-theme-dark</code>
            &gt;
            <code>.hds-theme-light</code>
            &gt;
            <code>.hds-theme-dark</code></SGI.Label>
          <div class="hds-theme-dark">
            <ThemingBasicContainer>
              <div class="hds-theme-light">
                <ThemingBasicContainer>
                  <div class="hds-theme-dark">
                    <ThemingBasicContainer @text="TEXT" />
                  </div>
                </ThemingBasicContainer>
              </div>
            </ThemingBasicContainer>
          </div>
        </SG.Item>
      </ShwGrid>
    {{else}}
      <div class="shw-page-foundations-theming-banner-incorrect-stylesheet">
        <ShwTextBody>These examples are visible only if theming is applied via
          "CSS selectors" or "combined strategies", please select a theme below
          one of these two groups of options in the selector at the top of the
          page</ShwTextBody>
      </div>
    {{/if}}
  </template>
}
