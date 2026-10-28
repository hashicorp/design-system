import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import { HdsDropdown } from '@hashicorp/design-system-components/components';
import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';
import type { HdsThemes } from '@hashicorp/design-system-components/services/hds-theming';

const THEMING_OPTIONS: Array<{ theme: HdsThemes; label: string }> = [
  { theme: 'system', label: 'System' },
  { theme: 'light', label: 'Light' },
  { theme: 'dark', label: 'Dark' },
];

export default class LocalComponent extends Component {
  @service declare readonly hdsTheming: HdsThemingService;

  get themingOptions() {
    return THEMING_OPTIONS;
  }

  // ...

  @action
  onClickThemeSwitcherOption(theme: HdsThemes) {
    // ...
    this.hdsTheming.setTheme({
      theme,
      onSetTheme: ({ currentTheme }) => {
        if (currentTheme !== undefined) {
          localStorage.setItem('hds-theme', currentTheme);
        }
      },
    });
  }

  <template>
    <HdsDropdown as |dd|>
      <dd.ToggleButton @text="Theme" />
      <dd.Title @text="Choose a theme" />
      {{#each this.themingOptions as |option|}}
        <dd.Checkmark
          @selected={{eq this.hdsTheming.currentTheme option.theme}}
          {{on "click" (fn this.onClickThemeSwitcherOption option.theme)}}
        >{{option.label}}</dd.Checkmark>
      {{/each}}
    </HdsDropdown>
  </template>
}
