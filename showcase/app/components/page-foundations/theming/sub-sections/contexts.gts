import Component from '@glimmer/component';
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { service } from '@ember/service';
import { array } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
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
import type { HdsCssSelectors } from '@hashicorp/design-system-components/services/hds-theming';

// TODO do we need 'system' here?
const THEMES = ['system', 'light', 'dark'];

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
    selector: HdsCssSelectors;
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
    return this.args.selector === 'class'
      ? `hds-theme-${this.args.subselector}`
      : undefined;
  }

  get dataSelector() {
    return this.args.selector === 'data' ? this.args.subselector : undefined;
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
    <div class={{this.classSelector}} data-hds-theme={{this.dataSelector}}>
      <ThemingBasicContainer
        class={{if
          this.notAvailable
          "shw-foundation-theming-basic-container--not-available"
        }}
      >
        {{!-- {{if this.notAvailable "n.a." "text"}} --}}
        {{if this.notAvailable "⤫" "text"}}
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
        {{#each THEMES as |theme|}}
          <SG.Item as |SGI|>
            <SGI.Label><code>theme={{theme}}</code></SGI.Label>
            <HdsThemeContext @theme={{theme}}>
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
          <SGI.Label><code>theme=light</code>
            &gt;
            <code>theme=dark</code></SGI.Label>
          <HdsThemeContext @theme="light">
            <ThemingBasicContainer>
              <HdsThemeContext @theme="dark">
                <ThemingBasicContainer @text="TEXT" />
              </HdsThemeContext>
            </ThemingBasicContainer>
          </HdsThemeContext>
        </SG.Item>
        <SG.Item as |SGI|>
          <SGI.Label><code>theme=dark</code>
            &gt;
            <code>theme=light</code></SGI.Label>
          <HdsThemeContext @theme="dark">
            <ThemingBasicContainer>
              <HdsThemeContext @theme="light">
                <ThemingBasicContainer @text="TEXT" />
              </HdsThemeContext>
            </ThemingBasicContainer>
          </HdsThemeContext>
        </SG.Item>
        <SG.Item as |SGI|>
          <SGI.Label><code>theme=dark</code>
            &gt;
            <code>theme=light</code>
            &gt;
            <code>theme=dark</code></SGI.Label>
          <HdsThemeContext @theme="dark">
            <ThemingBasicContainer>
              <HdsThemeContext @theme="light">
                <ThemingBasicContainer>
                  <HdsThemeContext @theme="dark">
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
        {{#let (array "class" "data") as |selectors|}}
          {{#each selectors as |selector|}}
            {{#let
              (array
                "light"
                "dark"
                "default"
                "system"
                "cds-g0"
                "cds-g100"
                "cds-g10"
                "cds-g90"
              )
              as |subselectors|
            }}
              {{#each subselectors as |subselector|}}
                <SG.Item as |SGI|>
                  <SGI.Label><code>
                      {{#if (eq selector "class")}}
                        .hds-theme-{{subselector}}
                      {{/if}}
                      {{#if (eq selector "data")}}
                        [data-hds-theme={{subselector}}]
                      {{/if}}
                    </code></SGI.Label>
                  <TheminBasicContainerWithParentSelector
                    @selector={{selector}}
                    @subselector={{subselector}}
                    @text="TEXT"
                  />
                </SG.Item>
              {{/each}}
            {{/let}}
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
        <SG.Item as |SGI|>
          <SGI.Label><code>[data-hds-theme=light]</code>
            &gt;
            <code>[data-hds-theme=dark]</code></SGI.Label>
          <div data-hds-theme="light">
            <ThemingBasicContainer>
              <div data-hds-theme="dark">
                <ThemingBasicContainer @text="TEXT" />
              </div>
            </ThemingBasicContainer>
          </div>
        </SG.Item>
        <SG.Item as |SGI|>
          <SGI.Label><code>[data-hds-theme=dark]</code>
            &gt;
            <code>[data-hds-theme=light]</code></SGI.Label>
          <div data-hds-theme="dark">
            <ThemingBasicContainer>
              <div data-hds-theme="light">
                <ThemingBasicContainer @text="TEXT" />
              </div>
            </ThemingBasicContainer>
          </div>
        </SG.Item>
        <SG.Item as |SGI|>
          <SGI.Label><code>[data-hds-theme=dark]</code>
            &gt;
            <code>[data-hds-theme=light]</code>
            &gt;
            <code>[data-hds-theme=dark]</code></SGI.Label>
          <div data-hds-theme="dark">
            <ThemingBasicContainer>
              <div data-hds-theme="light">
                <ThemingBasicContainer>
                  <div data-hds-theme="dark">
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
