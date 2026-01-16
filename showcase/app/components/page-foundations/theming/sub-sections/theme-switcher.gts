import Component from '@glimmer/component';
import style from 'ember-style-modifier';
import { service } from '@ember/service';

import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsThemeSwitcher } from '@hashicorp/design-system-components/components';
import ShwThemingService from 'showcase/services/shw-theming';

import type {
  HdsOnSetThemeCallback,
  HdsOnSetThemeCallbackArgs,
} from '@hashicorp/design-system-components/services/hds-theming';

export default class SubSectionThemeSwitcher extends Component {
  @service declare readonly shwTheming: ShwThemingService;

  onSetTheme: HdsOnSetThemeCallback = ({
    currentTheme,
  }: HdsOnSetThemeCallbackArgs) => {
    if (
      this.shwTheming.currentStylesheet === 'standard' ||
      (currentTheme === 'default' &&
        this.shwTheming.currentStylesheet === 'css-selectors')
    ) {
      window.alert(
        'The theming stylesheet will be switched to "css-selectors--migration" to support this theme selection.',
      );
      this.shwTheming.setStylesheet('css-selectors--migration');
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

    <ShwGrid @columns={{4}} @gap="2rem" {{style width="fit-content"}} as |SG|>
      <SG.Item @label="System/Light/Dark (default)">
        <HdsThemeSwitcher @onSetTheme={{this.onSetTheme}} />
      </SG.Item>
      <SG.Item @label="Only Light/Dark">
        <HdsThemeSwitcher
          @hasSystemOption={{false}}
          @onSetTheme={{this.onSetTheme}}
        />
      </SG.Item>
      <SG.Item @label="Light/Dark + Default">
        <HdsThemeSwitcher
          @hasDefaultOption={{true}}
          @hasSystemOption={{false}}
          @onSetTheme={{this.onSetTheme}}
        />
      </SG.Item>
      <SG.Item @label="System/Light/Dark + Default">
        <HdsThemeSwitcher
          @hasDefaultOption={{true}}
          @onSetTheme={{this.onSetTheme}}
        />
      </SG.Item>
    </ShwGrid>
  </template>
}
