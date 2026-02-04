import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsAppHeader,
  HdsAppHeaderHomeLink,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  {{! for demo purposes, we set @hasA11yRefocus to false but in your app it will
probably need to be set to true (or omitted to rely on defaults) }}
  <HdsAppHeader @hasA11yRefocus={{false}}>
    <:logo>
      <HdsAppHeaderHomeLink
        @icon="hashicorp"
        @text="HashiCorp home menu"
        @href="/"
      />
    </:logo>

    <:globalActions>
      <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
        <dd.ToggleButton @text="Choose an organization" @icon="org" />
        <dd.Checkmark>
          organizationName
        </dd.Checkmark>
      </HdsDropdown>
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
