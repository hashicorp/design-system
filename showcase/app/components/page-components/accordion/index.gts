/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SectionBaseElements from 'showcase/components/page-components/accordion/sections/base-elements';
import SectionVariants from 'showcase/components/page-components/accordion/sections/variants';
import SectionContent from 'showcase/components/page-components/accordion/sections/content';
import SectionContext from 'showcase/components/page-components/accordion/sections/context';

const IndexAccordion: TemplateOnlyComponent = <template>
  {{pageTitle "Accordion Component"}}

  <ShwTextH1>Accordion</ShwTextH1>

  <section data-test-percy>
    <SectionVariants />
    <SectionContent />
    <SectionContext />
    <SectionBaseElements />
  </section>
</template>;

export default IndexAccordion;
