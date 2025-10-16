import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';

import { HdsThemeSwitcher } from '@hashicorp/design-system-components/components';

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

const PageFoundationsThemingFramelessPageWithContextualThemes: TemplateOnlyComponent =
  <template>
    {{pageTitle "Page with contextual themes - Frameless"}}

    <div class="shw-foundation-theming-page-padding">
      <ShwTextH1>Contextual theming</ShwTextH1>

      <div class="shw-foundation-theming-page-theme-switcher-container">
        <ShwTextBody>Page theme:</ShwTextBody>
        <HdsThemeSwitcher @toggleSize="medium" @toggleIsFullWidth={{true}} />
      </div>

      <ShwDivider />

      <ShwTextH2>Page-level theming</ShwTextH2>

      <ShwTextBody>These examples should update when changing theme above</ShwTextBody>

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

      <ShwTextH2>Local theming via CSS selectors</ShwTextH2>

      <ShwTextBody>These examples should remain the same even when changing
        theme above</ShwTextBody>

      <ShwTextH4 @tag="h3">Parent container</ShwTextH4>

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

      <ShwTextH4 @tag="h3">Nested</ShwTextH4>

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

    </div>
  </template>;

export default PageFoundationsThemingFramelessPageWithContextualThemes;
