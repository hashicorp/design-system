import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsThemeContext,
  HdsAlert,
  HdsButtonSet,
  HdsButton,
  HdsBadge,
  HdsTextDisplay,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  {{! No context }}
  <div class="doc-theme-switcher-demo-block">
    <HdsTextDisplay @size="300">No context</HdsTextDisplay>
    <HdsTextBody @tag="p" @color="strong">
      These components are not inside a theming context and their visual
      appearance will change accordingly when the theme is switched
    </HdsTextBody>
    <HdsButtonSet>
      <HdsButton @text="Primary" @icon="plus" @iconPosition="trailing" />
      <HdsButton @text="Secondary" @color="secondary" />
      <HdsButton @text="Critical" @color="critical" />
    </HdsButtonSet>
    <HdsAlert @type="inline" @color="highlight" as |A|>
      <A.Title>Inline alert</A.Title>
      <A.Description>Lorem ipsum dolor sit amet.</A.Description>
    </HdsAlert>
    <HdsBadge @color="highlight" @icon="award" @text="Highlight badge" />
  </div>

  {{! "Light" context }}
  <HdsThemeContext @context="light">
    <div class="doc-theme-switcher-demo-block">
      <HdsTextDisplay @size="300">"Light" context</HdsTextDisplay>
      <HdsTextBody @tag="p" @color="strong">
        These components are inside a "light" theming context and their visual
        appearance will NOT change
      </HdsTextBody>
      <HdsAlert @type="inline" @color="highlight" as |A|>
        <A.Title>Inline alert</A.Title>
        <A.Description>Lorem ipsum dolor sit amet.</A.Description>
      </HdsAlert>
      <HdsButtonSet>
        <HdsButton @text="Primary" @icon="plus" @iconPosition="trailing" />
        <HdsButton @text="Secondary" @color="secondary" />
        <HdsButton @text="Critical" @color="critical" />
      </HdsButtonSet>
      <HdsBadge @color="highlight" @icon="award" @text="Highlight badge" />
    </div>
  </HdsThemeContext>

  {{! "Dark" context }}
  <HdsThemeContext @context="dark">
    <div class="doc-theme-switcher-demo-block">
      <HdsTextDisplay @size="300">"Dark" context</HdsTextDisplay>
      <HdsTextBody @tag="p" @color="strong">
        These components are inside a "dark" theming context and their visual
        appearance will NOT change
      </HdsTextBody>
      <HdsAlert @type="inline" @color="highlight" as |A|>
        <A.Title>Inline alert</A.Title>
        <A.Description>Lorem ipsum dolor sit amet.</A.Description>
      </HdsAlert>
      <HdsButtonSet>
        <HdsButton @text="Primary" @icon="plus" @iconPosition="trailing" />
        <HdsButton @text="Secondary" @color="secondary" />
        <HdsButton @text="Critical" @color="critical" />
      </HdsButtonSet>
      <HdsBadge @color="highlight" @icon="award" @text="Highlight badge" />
    </div>
  </HdsThemeContext>
</template>;

export default LocalComponent;
