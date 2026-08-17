/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContent from 'showcase/components/page-components/copy/button/sub-sections/content';
import SubSectionSizes from 'showcase/components/page-components/copy/button/sub-sections/sizes';
import SubSectionStates from 'showcase/components/page-components/copy/button/sub-sections/states';
import SubSectionDemos from 'showcase/components/page-components/copy/button/sub-sections/demos';

const CopyButtonIndex: TemplateOnlyComponent = <template>
  {{pageTitle "CopyButton Component"}}

  <ShwTextH1>CopyButton</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
    <SubSectionSizes />
    <SubSectionStates />
    <SubSectionDemos />
  </section>
</template>;

export default CopyButtonIndex;
