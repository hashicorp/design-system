import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsThemeSwitcher } from '@hashicorp/design-system-components/components';

const SubSectionThemeSwitcher: TemplateOnlyComponent = <template>
  <ShwTextH2>Theme switcher</ShwTextH2>

  <ShwTextH4 @tag="h3">Size</ShwTextH4>

  <ShwFlex @gap="2rem" as |SF|>
    <SF.Item @label="small (default)">
      <HdsThemeSwitcher />
    </SF.Item>
    <SF.Item @label="medium">
      <HdsThemeSwitcher @toggleSize="medium" />
    </SF.Item>
  </ShwFlex>

  <ShwFlex as |SF|>
    <SF.Item @label="full-width">
      <div {{style width="150px"}}>
        <HdsThemeSwitcher @toggleIsFullWidth={{true}} />
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Options</ShwTextH4>

  <ShwFlex @gap="2rem" as |SF|>
    <SF.Item @label="System/Light/Dark (default)">
      <HdsThemeSwitcher />
    </SF.Item>
    <SF.Item @label="Only Light/Dark">
      <HdsThemeSwitcher @hasSystemOption={{false}} />
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionThemeSwitcher;
