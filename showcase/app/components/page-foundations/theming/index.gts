import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwDivider from 'showcase/components/shw/divider';

import SubSectionThemeSwitcher from 'showcase/components/page-foundations/theming/sub-sections/theme-switcher';
import SubSectionContexts from 'showcase/components/page-foundations/theming/sub-sections/contexts';
import SubSectionComponents from 'showcase/components/page-foundations/theming/sub-sections/components';
import SubSectionDemo from 'showcase/components/page-foundations/theming/sub-sections/demo';

const ThemingIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Theming"}}

  <ShwTextH1>Theming</ShwTextH1>

  <section data-test-percy>
    <SubSectionThemeSwitcher />
  </section>

  <ShwDivider />

  {{! For some reason, Ember tests don't play well with iframes (URL not found) so we don't snapshots them in Percy }}
  <section>
    <SubSectionContexts />
  </section>

  <ShwDivider />

  <section data-test-percy>
    <SubSectionComponents />
  </section>

  <ShwDivider />

  {{! For some reason, Ember tests don't play well with iframes (URL not found) so we don't snapshots them in Percy }}
  <section>
    <SubSectionDemo />
  </section>
</template>;

export default ThemingIndex;
