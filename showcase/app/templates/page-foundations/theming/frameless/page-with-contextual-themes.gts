import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { pageTitle } from 'ember-page-title';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';

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

      <ShwDivider @level={{2}} />

      <ShwTextH2>Page-level theming</ShwTextH2>

      <ShwFlex as |SF|>
        <SF.Item as |SFI|>
          <SFI.Label>Container with color
            <code>foreground-strong</code>
            / background
            <code>surface-strong</code></SFI.Label>
          <ThemingBasicContainer @text="TEXT" />
        </SF.Item>
      </ShwFlex>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Local theming</ShwTextH2>

      <ShwTextH4 @tag="h3">CSS Selectors</ShwTextH4>

      <ShwFlex @gap="4rem" as |SF|>
        <SF.Item as |SFI|>
          <SFI.Label><code>.hds-theme-light</code> class</SFI.Label>
          <div class="hds-theme-light">
            <ThemingBasicContainer @text="TEXT" />
          </div>
        </SF.Item>
        <SF.Item as |SFI|>
          <SFI.Label><code>.hds-theme-dark</code> class</SFI.Label>
          <div class="hds-theme-dark">
            <ThemingBasicContainer @text="TEXT" />
          </div>
        </SF.Item>
        <SF.Item as |SFI|>
          <SFI.Label><code>[data-hds-theme=&quot;light&quot;]</code>
            class</SFI.Label>
          <div data-hds-theme="light">
            <ThemingBasicContainer @text="TEXT" />
          </div>
        </SF.Item>
        <SF.Item as |SFI|>
          <SFI.Label><code>[data-hds-theme=&quot;dark&quot;]</code>
            class</SFI.Label>
          <div data-hds-theme="dark">
            <ThemingBasicContainer @text="TEXT" />
          </div>
        </SF.Item>
      </ShwFlex>

      <ShwTextH4 @tag="h3">Nested</ShwTextH4>

      <ShwFlex @gap="4rem" as |SF|>
        <SF.Item as |SFI|>
          <SFI.Label><code>.hds-theme-light</code>
            &gt;
            <code>.hds-theme-dark</code></SFI.Label>
          <div class="hds-theme-light">
            <ThemingBasicContainer>
              <div class="hds-theme-dark">
                <ThemingBasicContainer @text="TEXT" />
              </div>
            </ThemingBasicContainer>
          </div>
        </SF.Item>
        <SF.Item as |SFI|>
          <SFI.Label><code>.hds-theme-dark</code>
            &gt;
            <code>.hds-theme-light</code></SFI.Label>
          <div class="hds-theme-dark">
            <ThemingBasicContainer>
              <div class="hds-theme-light">
                <ThemingBasicContainer @text="TEXT" />
              </div>
            </ThemingBasicContainer>
          </div>
        </SF.Item>
        <SF.Item as |SFI|>
          <SFI.Label><code>.hds-theme-dark</code>
            &gt;
            <code>.hds-theme-light</code>
            &gt;
            <code>.hds-theme-dark</code></SFI.Label>
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
        </SF.Item>
      </ShwFlex>

    </div>
  </template>;

export default PageFoundationsThemingFramelessPageWithContextualThemes;
