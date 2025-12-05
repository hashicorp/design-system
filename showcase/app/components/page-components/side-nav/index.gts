/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionOtherElements from 'showcase/components/page-components/side-nav/sub-sections/other-elements';
import SubSectionBaseElements from 'showcase/components/page-components/side-nav/sub-sections/base-elements';
import SubSectionExamples from 'showcase/components/page-components/side-nav/sub-sections/examples';
import SubSectionContent from 'showcase/components/page-components/side-nav/sub-sections/content';

const SideNavIndex: TemplateOnlyComponent = <template>
  {{pageTitle "SideNav Component"}}

  <ShwTextH1>SideNav</ShwTextH1>

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

  <section data-test-percy>
    <SubSectionOtherElements />
  </section>
</template>;

export default SideNavIndex;
