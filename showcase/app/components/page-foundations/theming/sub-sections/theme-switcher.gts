import Component from '@glimmer/component';
import style from 'ember-style-modifier';
import { service } from '@ember/service';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsThemeSwitcher } from '@hashicorp/design-system-components/components';
import ShwThemingService from 'showcase/services/shw-theming';

import type {
  OnSetThemeCallback,
  OnSetThemeCallbackArgs,
} from '@hashicorp/design-system-components/services/hds-theming';

export default class SubSectionThemeSwitcher extends Component {
  @service declare readonly shwTheming: ShwThemingService;

  onSetTheme: OnSetThemeCallback = ({
    currentTheme,
  }: OnSetThemeCallbackArgs) => {
    if (
      (currentTheme === 'system' &&
        (this.shwTheming.currentStylesheet === 'standard' ||
          this.shwTheming.currentStylesheet === 'css-selectors')) ||
      ((currentTheme === 'light' || currentTheme === 'dark') &&
        (this.shwTheming.currentStylesheet === 'standard' ||
          this.shwTheming.currentStylesheet === 'prefers-color-scheme'))
    ) {
      window.alert(
        'The theming stylesheet will be switched to "combined-strategies" to support this theme selection.',
      );
      this.shwTheming.setStylesheet('combined-strategies');
    }
  };

  <template>
    <ShwTextH2>Theme switcher</ShwTextH2>

    <ShwTextH4 @tag="h3">Size</ShwTextH4>

    <ShwFlex @gap="2rem" as |SF|>
      <SF.Item @label="small (default)">
        <HdsThemeSwitcher @onSetTheme={{this.onSetTheme}} />
      </SF.Item>
      <SF.Item @label="medium">
        <HdsThemeSwitcher
          @toggleSize="medium"
          @onSetTheme={{this.onSetTheme}}
        />
      </SF.Item>
    </ShwFlex>

    <ShwFlex as |SF|>
      <SF.Item @label="full-width">
        <div {{style width="150px"}}>
          <HdsThemeSwitcher
            @toggleIsFullWidth={{true}}
            @onSetTheme={{this.onSetTheme}}
          />
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH4 @tag="h3">Options</ShwTextH4>

    <ShwFlex @gap="2rem" as |SF|>
      <SF.Item @label="System/Light/Dark (default)">
        <HdsThemeSwitcher @onSetTheme={{this.onSetTheme}} />
      </SF.Item>
      <SF.Item @label="Only Light/Dark">
        <HdsThemeSwitcher
          @hasSystemOption={{false}}
          @onSetTheme={{this.onSetTheme}}
        />
      </SF.Item>
    </ShwFlex>
  </template>
}
