import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAppHeader } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  {{! for demo purposes, we set @hasA11yRefocus to false but in your app it will
probably need to be set to true (or omitted to rely on defaults) }}
  <HdsAppHeader @hasA11yRefocus={{false}}>
    <:logo>
      <DocPlaceholder
        @height="2em"
        @width="auto"
        @text="HomeLink"
        @background="#e4e4e4"
      />
    </:logo>

    <:globalActions>
      <DocPlaceholder
        @height="2em"
        @width="auto"
        @text="OrgSwitcher"
        @background="#e4e4e4"
      />
    </:globalActions>

    <:utilityActions>
      <DocPlaceholder
        @height="2em"
        @width="auto"
        @text="HelpMenu"
        @background="#e4e4e4"
      />
      <DocPlaceholder
        @height="2em"
        @width="auto"
        @text="UserMenu"
        @background="#e4e4e4"
      />
    </:utilityActions>
  </HdsAppHeader>
</template>;

export default LocalComponent;
