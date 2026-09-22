import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';

import {
  HdsAppHeader,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

export default class LocalComponent extends Component {
  @tracked selectedTheme: 'system' | 'light' | 'dark' = 'system';

  <template>
    {{! for demo purposes, we set @hasA11yRefocus to false but in your app it will probably need to be set to true (or omitted to rely on defaults) }}
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
          @text="LanguageSelector"
          @background="#e4e4e4"
        />

        <DocPlaceholder
          @height="2em"
          @width="auto"
          @text="HelpMenu"
          @background="#e4e4e4"
        />
        <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
          <dd.ToggleIcon @icon="user" @text="user menu" />
          <dd.Title @text="Signed In" />
          <dd.Description @text="email@domain.com" />
          <dd.Interactive @route="components" {{on "click" dd.close}}>Account
            settings</dd.Interactive>
          <dd.Title @text="Theme" />
          <dd.Checkmark
            @icon="monitor"
            @selected={{eq this.selectedTheme "system"}}
            {{on "click" dd.close}}
          >System</dd.Checkmark>
          <dd.Checkmark
            @icon="sun"
            @selected={{eq this.selectedTheme "light"}}
            {{on "click" dd.close}}
          >Light</dd.Checkmark>
          <dd.Checkmark
            @icon="moon"
            @selected={{eq this.selectedTheme "dark"}}
            {{on "click" dd.close}}
          >Dark</dd.Checkmark>
        </HdsDropdown>
      </:utilityActions>
    </HdsAppHeader>
  </template>
}
