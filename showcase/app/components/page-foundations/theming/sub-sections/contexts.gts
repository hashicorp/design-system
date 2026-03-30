import Component from '@glimmer/component';
import { service } from '@ember/service';
import { helper } from '@ember/component/helper';
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
import type { HdsThemeContexts } from '@hashicorp/design-system-components/components/hds/theme-context/types';

import ShwThemingService from 'showcase/services/shw-theming';
import {
  CONTEXTUAL_THEMES,
  CONTEXTUAL_MODES,
} from '@hashicorp/design-system-components/components/hds/theme-context/index';

import type { ShwStylesheets } from 'showcase/services/shw-theming';

const styleIsAvailable = helper(
  ([currentStylesheet, context]: [ShwStylesheets, HdsThemeContexts]) => {
    const isAvailable =
      (context === 'default' &&
        (currentStylesheet === 'css-selectors--migration' ||
          currentStylesheet === 'css-selectors--advanced')) ||
      ((context === 'system' || context === 'light' || context === 'dark') &&
        currentStylesheet !== 'standard') ||
      (context.startsWith('cds-g') &&
        currentStylesheet === 'css-selectors--advanced');
    return isAvailable;
  },
);

interface ThemingBasicContainerSignature {
  Args: {
    text?: string;
    isAvailable?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

class ThemingBasicContainer extends Component<ThemingBasicContainerSignature> {
  get text() {
    // we use a special text if `@isAvailable` is explictly set to `false`
    if (this.args.isAvailable === false) {
      return '⤫';
    } else {
      return this.args.text;
    }
  }

  get classNames(): string {
    const classes = ['shw-foundation-theming-basic-container'];

    // add a class if `@isAvailable` is explictly set to `false`
    if (this.args.isAvailable === false) {
      classes.push('shw-foundation-theming-basic-container--not-available');
    }

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{#if (has-block)}}
        {{yield}}
      {{else}}
        <div>{{this.text}}</div>
      {{/if}}
    </div>
  </template>
}

export default class SubSectionContexts extends Component {
  @service declare readonly shwTheming: ShwThemingService;

  get contextualThemes() {
    return CONTEXTUAL_THEMES as HdsThemeContexts[];
  }

  get contextualModes() {
    return CONTEXTUAL_MODES as HdsThemeContexts[];
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

    {{#if (eq this.shwTheming.currentStylesheet "standard")}}
      <div class="shw-page-foundations-theming-banner-incorrect-stylesheet">
        <ShwTextBody>These examples are visible only if theming is applied,
          please select a theme in the selector at the top of the page</ShwTextBody>
      </div>
    {{else}}
      <ShwGrid
        @gap="4rem"
        @columns={{2}}
        {{style width="fit-content" grid-template-columns="repeat(4, auto)"}}
        as |SG|
      >
        {{#each this.contextualThemes as |theme|}}
          <SG.Item as |SGI|>
            <SGI.Label><code>@context={{theme}}</code></SGI.Label>
            <HdsThemeContext @context={{theme}}>
              {{#let
                (styleIsAvailable this.shwTheming.currentStylesheet theme)
                as |isAvailable|
              }}
                <ThemingBasicContainer
                  @text="TEXT"
                  @isAvailable={{isAvailable}}
                />
              {{/let}}
            </HdsThemeContext>
          </SG.Item>
        {{/each}}
        {{#each this.contextualModes as |mode|}}
          <SG.Item as |SGI|>
            <SGI.Label><code>@context={{mode}}</code></SGI.Label>
            <HdsThemeContext @context={{mode}}>
              {{#let
                (styleIsAvailable this.shwTheming.currentStylesheet mode)
                as |isAvailable|
              }}
                <ThemingBasicContainer
                  @text="TEXT"
                  @isAvailable={{isAvailable}}
                />
              {{/let}}
            </HdsThemeContext>
          </SG.Item>
        {{/each}}
      </ShwGrid>
    {{/if}}

    <ShwDivider @level={{2}} />

    <ShwTextH4>Nested</ShwTextH4>

    {{#if (eq this.shwTheming.currentStylesheet "standard")}}
      <div class="shw-page-foundations-theming-banner-incorrect-stylesheet">
        <ShwTextBody>These examples are visible only if theming is applied,
          please select a theme in the selector at the top of the page</ShwTextBody>
      </div>
    {{else}}
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
    {{/if}}

    <ShwDivider />

    <ShwTextH3>Local theming via CSS selectors</ShwTextH3>

    <ShwTextBody>These examples below should remain the same even when changing
      theme</ShwTextBody>

    <ShwTextH4>Parent container</ShwTextH4>

    {{#if (eq this.shwTheming.currentStylesheet "standard")}}
      <div class="shw-page-foundations-theming-banner-incorrect-stylesheet">
        <ShwTextBody>These examples are visible only if theming is applied,
          please select a theme in the selector at the top of the page</ShwTextBody>
      </div>
    {{else}}
      <ShwGrid
        @gap="4rem"
        @columns={{2}}
        {{style width="fit-content" grid-template-columns="repeat(4, auto)"}}
        as |SG|
      >
        {{#let this.contextualThemes as |themes|}}
          {{#each themes as |theme|}}
            <SG.Item as |SGI|>
              <SGI.Label><code>
                  .hds-theme-{{theme}}
                </code></SGI.Label>
              <div class="hds-theme-{{theme}}">
                {{#let
                  (styleIsAvailable this.shwTheming.currentStylesheet theme)
                  as |isAvailable|
                }}
                  <ThemingBasicContainer
                    @text="TEXT"
                    @isAvailable={{isAvailable}}
                  />
                {{/let}}
              </div>
            </SG.Item>
          {{/each}}
        {{/let}}
      </ShwGrid>
    {{/if}}

    <ShwDivider @level={{2}} />

    <ShwTextH4>Nested</ShwTextH4>

    {{#if (eq this.shwTheming.currentStylesheet "standard")}}
      <div class="shw-page-foundations-theming-banner-incorrect-stylesheet">
        <ShwTextBody>These examples are visible only if theming is applied,
          please select a theme in the selector at the top of the page</ShwTextBody>
      </div>
    {{else}}
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
    {{/if}}
  </template>
}
