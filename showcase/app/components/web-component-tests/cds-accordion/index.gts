/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionVariants from 'showcase/components/web-component-tests/cds-accordion/sub-sections/variants';
import SubSectionStates from 'showcase/components/web-component-tests/cds-accordion/sub-sections/states';
import SubSectionContent from 'showcase/components/web-component-tests/cds-accordion/sub-sections/content';
import SubSectionEvents from 'showcase/components/web-component-tests/cds-accordion/sub-sections/events';
import SubSectionExternalControl from 'showcase/components/web-component-tests/cds-accordion/sub-sections/external-control';
import SubSectionNested from 'showcase/components/web-component-tests/cds-accordion/sub-sections/nested';

const CdsAccordionIndex: TemplateOnlyComponent = <template>
  {{pageTitle "CDS Accordion Component"}}

  <ShwTextH1>CDS Accordion</ShwTextH1>

  <section data-test-percy>
    <SubSectionVariants />
    <SubSectionStates />
    <SubSectionContent />
    <SubSectionEvents />
    <SubSectionExternalControl />
    <SubSectionNested />
  </section>
</template>;

export default CdsAccordionIndex;
