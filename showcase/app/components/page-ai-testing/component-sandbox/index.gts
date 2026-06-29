/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import SubSectionComponentSandbox from 'showcase/components/page-ai-testing/component-sandbox/sub-sections/component-sandbox';

const PageAiTestingComponentSandboxIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Component Sandbox"}}

  <ShwTextH1>Component Sandbox</ShwTextH1>

  <section data-test-percy>
    <SubSectionComponentSandbox />
  </section>
</template>;

export default PageAiTestingComponentSandboxIndex;
