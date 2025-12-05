/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseElements from 'showcase/components/page-components/accordion/sub-sections/base-elements';
import SubSectionVariants from 'showcase/components/page-components/accordion/sub-sections/variants';
import SubSectionContent from 'showcase/components/page-components/accordion/sub-sections/content';
import SubSectionContext from 'showcase/components/page-components/accordion/sub-sections/context';

const AccordionIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Accordion Component"}}

  <ShwTextH1>Accordion</ShwTextH1>

  <section data-test-percy>
    <SubSectionVariants />
    <SubSectionContent />
    <SubSectionContext />
    <SubSectionBaseElements />
  </section>
</template>;

export default AccordionIndex;
