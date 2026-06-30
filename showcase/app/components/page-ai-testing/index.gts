/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionHeliosDemoApp from 'showcase/components/page-ai-testing/helios-demo-app/sub-sections/helios-demo-app';
import SubSectionCarbonDemoApp from 'showcase/components/page-ai-testing/carbon-demo-app/sub-sections/carbon-demo-app';
import SubSectionComponentSandbox from 'showcase/components/page-ai-testing/component-sandbox/sub-sections/component-sandbox.gts';

const PageAiTestingIndex: TemplateOnlyComponent = <template>
  {{pageTitle "AI Testing Demo"}}

  <ShwTextH1>AI Testing Demo</ShwTextH1>

  <section data-test-percy>
    <SubSectionHeliosDemoApp />
    <SubSectionCarbonDemoApp />
    <SubSectionComponentSandbox />

  </section>
</template>;

export default PageAiTestingIndex;
