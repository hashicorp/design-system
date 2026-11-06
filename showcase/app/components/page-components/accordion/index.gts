/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContent from 'showcase/components/page-components/accordion/sub-sections/content';
import SubSectionVariants from 'showcase/components/page-components/accordion/sub-sections/variants';
import SubSectionStates from 'showcase/components/page-components/accordion/sub-sections/states';
import SubSectionDemos from 'showcase/components/page-components/accordion/sub-sections/demos';
import SubSectionBaseElements from 'showcase/components/page-components/accordion/sub-sections/base-elements';

const AccordionIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Accordion Component"}}

  <ShwTextH1>Accordion</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
    <SubSectionVariants />
    <SubSectionStates />
    <SubSectionDemos />
    <SubSectionBaseElements />
  </section>
</template>;

export default AccordionIndex;
