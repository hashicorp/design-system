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
  {{! "light/cds-g10" mode }}
  <HdsThemeContext @context="cds-g10">
    <div class="doc-theme-switcher-demo-block">
      <HdsTextDisplay @size="300">Light "cds-g10" context</HdsTextDisplay>
      <HdsTextBody @tag="p" @color="strong">
        These components are rendered with a "light / cds-g10" theming mode
        applied to them
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

  {{! "dark/cds-g90" mode }}
  <HdsThemeContext @context="cds-g90">
    <div class="doc-theme-switcher-demo-block">
      <HdsTextDisplay @size="300">Dark "cds-g90" context</HdsTextDisplay>
      <HdsTextBody @tag="p" @color="strong">
        These components are rendered with a "dark / cds-g90" theming mode
        applied to them
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
