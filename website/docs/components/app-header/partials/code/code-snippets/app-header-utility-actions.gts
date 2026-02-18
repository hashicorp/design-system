import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';

import {
  HdsAppHeader,
  HdsAppHeaderHomeLink,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

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
      <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
        <dd.ToggleIcon @icon="help" @text="help menu" />
        <dd.Title @text="Help & Support" />
        <dd.Interactive
          @route="components"
          {{on "click" dd.close}}
        >Documentation</dd.Interactive>
        <dd.Interactive
          @route="components"
          {{on "click" dd.close}}
        >Tutorials</dd.Interactive>
        <dd.Interactive @route="components" {{on "click" dd.close}}>Terraform
          Provider</dd.Interactive>
        <dd.Interactive
          @route="components"
          {{on "click" dd.close}}
        >Changelog</dd.Interactive>
        <dd.Separator />
        <dd.Interactive @route="components" {{on "click" dd.close}}>Create
          support ticket</dd.Interactive>
        <dd.Interactive @route="components" {{on "click" dd.close}}>Give
          feedback</dd.Interactive>
      </HdsDropdown>

      <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
        <dd.ToggleIcon @icon="user" @text="user menu" />
        <dd.Title @text="Signed In" />
        <dd.Description @text="email@domain.com" />
        <dd.Interactive @route="components" {{on "click" dd.close}}>Account
          settings</dd.Interactive>
      </HdsDropdown>
    </:utilityActions>
  </HdsAppHeader>
</template>;

export default LocalComponent;
