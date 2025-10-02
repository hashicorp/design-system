import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import CodeFragmentWithThemingBasicContainer from '../code-fragments/with-theming-basic-container';

const SubSectionContexts: TemplateOnlyComponent = <template>
  <ShwTextH2>Page-level theming</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>Container with color
        <code>foreground-strong</code>
        / background
        <code>surface-strong</code></SFI.Label>
      <CodeFragmentWithThemingBasicContainer @text="TEXT" />
    </SF.Item>
  </ShwFlex>

  <ShwDivider />

  <ShwTextH2>Contextual theming</ShwTextH2>

  <ShwFlex @gap="4rem" as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label><code>.hds-theme-light</code> class</SFI.Label>
      <div class="hds-theme-light">
        <CodeFragmentWithThemingBasicContainer @text="TEXT" />
      </div>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label><code>.hds-theme-dark</code> class</SFI.Label>
      <div class="hds-theme-dark">
        <CodeFragmentWithThemingBasicContainer @text="TEXT" />
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
        <CodeFragmentWithThemingBasicContainer>
          <div class="hds-theme-dark">
            <CodeFragmentWithThemingBasicContainer @text="TEXT" />
          </div>
        </CodeFragmentWithThemingBasicContainer>
      </div>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label><code>.hds-theme-dark</code>
        &gt;
        <code>.hds-theme-light</code></SFI.Label>
      <div class="hds-theme-dark">
        <CodeFragmentWithThemingBasicContainer>
          <div class="hds-theme-light">
            <CodeFragmentWithThemingBasicContainer @text="TEXT" />
          </div>
        </CodeFragmentWithThemingBasicContainer>
      </div>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label><code>.hds-theme-dark</code>
        &gt;
        <code>.hds-theme-light</code>
        &gt;
        <code>.hds-theme-dark</code></SFI.Label>
      <div class="hds-theme-dark">
        <CodeFragmentWithThemingBasicContainer>
          <div class="hds-theme-light">
            <CodeFragmentWithThemingBasicContainer>
              <div class="hds-theme-dark">
                <CodeFragmentWithThemingBasicContainer @text="TEXT" />
              </div>
            </CodeFragmentWithThemingBasicContainer>
          </div>
        </CodeFragmentWithThemingBasicContainer>
      </div>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContexts;
