/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import SubSectionHeliosDemoApp from 'showcase/components/page-ai-testing/helios-demo-app/sub-sections/helios-demo-app';

const PageAiTestingHeliosDemoAppIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Helios Demo App"}}

  <ShwTextH1>Helios Design System Demo</ShwTextH1>

  <section data-test-percy>
    <SubSectionHeliosDemoApp />
  </section>
</template>;

export default PageAiTestingHeliosDemoAppIndex;
