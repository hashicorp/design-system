import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';
import { service } from '@ember/service';
import { fn } from '@ember/helper';

import type Owner from '@ember/owner';

import {
  HdsAppHeader,
  HdsDropdown,
  HdsThemeContext,
} from '@hashicorp/design-system-components/components';

import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';
import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';

import DocPlaceholder from 'website/components/doc/placeholder';

type ThemeOption = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'selected-theme-demo';

const THEMING_OPTIONS: Record<
  ThemeOption,
  { icon: HdsIconSignature['Args']['name']; label: string }
> = {
  system: { icon: 'monitor', label: 'System' },
  light: { icon: 'sun', label: 'Light' },
  dark: { icon: 'moon', label: 'Dark' },
};

export default class LocalComponent extends Component {
  @service declare readonly hdsTheming: HdsThemingService;

  constructor(owner: Owner, args: Record<string, never>) {
    super(owner, args);

    const savedTheme = this.readThemeFromStorage();

    if (savedTheme) {
      this.deferApplyTheme(savedTheme);
    }
  }

  applyTheme(theme: ThemeOption): void {
    this.hdsTheming.setTheme({ theme });
  }

  deferApplyTheme(theme: ThemeOption): void {
    setTimeout(() => {
      this.applyTheme(theme);
    });
  }

  get hasLocalStorage(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }

  readThemeFromStorage(): ThemeOption | undefined {
    if (!this.hasLocalStorage) {
      return;
    }

    const storedTheme = window.localStorage.getItem(STORAGE_KEY);

    if (
      storedTheme === 'system' ||
      storedTheme === 'light' ||
      storedTheme === 'dark'
    ) {
      return storedTheme;
    }
  }

  storeTheme(theme: ThemeOption): void {
    if (!this.hasLocalStorage) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, theme);
  }

  selectTheme = (newTheme: ThemeOption, close: () => void) => {
    this.hdsTheming.setTheme({
      theme: newTheme,
      onSetTheme: () => {
        this.storeTheme(newTheme);
      },
    });

    close();
  };

  <template>
    <HdsThemeContext
      @context={{if this.hdsTheming.isCarbonThemeEnabled "dark" "default"}}
    >
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
            {{#each-in THEMING_OPTIONS as |key option|}}
              <dd.Checkmark
                @icon={{option.icon}}
                @selected={{eq this.hdsTheming.currentTheme key}}
                {{on "click" (fn this.selectTheme key dd.close)}}
              >{{option.label}}</dd.Checkmark>
            {{/each-in}}
          </HdsDropdown>
        </:utilityActions>
      </HdsAppHeader>
    </HdsThemeContext>
  </template>
}
