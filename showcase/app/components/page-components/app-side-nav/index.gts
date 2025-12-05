/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwDivider from 'showcase/components/shw/divider';

import SubSectionContent from 'showcase/components/page-components/app-side-nav/sub-sections/content';
import SubSectionFrames from 'showcase/components/page-components/app-side-nav/sub-sections/frames';
import SubSectionExamples from 'showcase/components/page-components/app-side-nav/sub-sections/examples';
import SubSectionBaseElements from 'showcase/components/page-components/app-side-nav/sub-sections/base-elements';

const AppSideNavIndex: TemplateOnlyComponent = <template>
  {{pageTitle "AppSideNav Component"}}

  <ShwTextH1>AppSideNav</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
  </section>

  <ShwDivider @level={{2}} />

  <section data-test-percy>
    <SubSectionExamples />
  </section>

  <ShwDivider />

  <section data-test-percy>
    <SubSectionBaseElements />
  </section>

  <ShwDivider />

  {{! For some reason, Ember tests don't play well with iframes (URL not found) so we can't take snapshots of these examples in Percy }}
  <section>
    <SubSectionFrames />
  </section>
</template>;

export default AppSideNavIndex;
