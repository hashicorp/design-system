/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import SubSectionCarbonDemoApp from 'showcase/components/page-ai-testing/carbon-demo-app/sub-sections/carbon-demo-app';

const PageAiTestingCarbonDemoAppIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Carbon Demo App"}}

  <ShwTextH1>Carbon Design System Demo</ShwTextH1>

  <section data-test-percy>
    <SubSectionCarbonDemoApp />
  </section>
</template>;

export default PageAiTestingCarbonDemoAppIndex;
