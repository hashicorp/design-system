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

import ShwThemingService from 'showcase/services/shw-theming';

interface ThemingBasicContainerSignature {
  Args: {
    text?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
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

export default class SubSectionContexts extends Component {
  @service declare readonly shwTheming: ShwThemingService;

  get showContextualExamples() {
    return (
      this.shwTheming.currentStylesheet === 'css-selectors' ||
      this.shwTheming.currentStylesheet === 'combined-strategies'
    );
  }

  <template>
    <ShwTextH2>Contextual theming</ShwTextH2>

    {{#if this.showContextualExamples}}

      <ShwTextH3>Page-level theming</ShwTextH3>

      <ShwTextBody>This example below should update when changing theme</ShwTextBody>

      <ShwFlex as |SF|>
        <SF.Item as |SFI|>
          <SFI.Label>Container with color
            <code>foreground-strong</code>
            / background
            <code>surface-strong</code></SFI.Label>
          <ThemingBasicContainer @text="TEXT" />
        </SF.Item>
      </ShwFlex>

      <ShwDivider />

      <ShwTextH3>Local theming via CSS selectors</ShwTextH3>

      <ShwTextBody>These examples below should remain the same even when
        changing theme</ShwTextBody>

      <ShwTextH4>Parent container</ShwTextH4>

      <ShwGrid
        @gap="4rem"
        @columns={{2}}
        {{style width="fit-content" grid-template-columns="repeat(2, auto)"}}
        as |SG|
      >
        <SG.Item as |SGI|>
          <SGI.Label><code>.hds-theme-light</code> class</SGI.Label>
          <div class="hds-theme-light">
            <ThemingBasicContainer @text="TEXT" />
          </div>
        </SG.Item>
        <SG.Item as |SGI|>
          <SGI.Label><code>.hds-theme-dark</code> class</SGI.Label>
          <div class="hds-theme-dark">
            <ThemingBasicContainer @text="TEXT" />
          </div>
        </SG.Item>
        <SG.Item as |SGI|>
          <SGI.Label><code>[data-hds-theme=light]</code>
            class</SGI.Label>
          <div data-hds-theme="light">
            <ThemingBasicContainer @text="TEXT" />
          </div>
        </SG.Item>
        <SG.Item as |SGI|>
          <SGI.Label><code>[data-hds-theme=dark]</code>
            class</SGI.Label>
          <div data-hds-theme="dark">
            <ThemingBasicContainer @text="TEXT" />
          </div>
        </SG.Item>
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH4>Nested</ShwTextH4>

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
