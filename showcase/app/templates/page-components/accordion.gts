/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import BaseElementsSection from 'showcase/components/page-components/accordion/sections/base-elements';
import VariantsSection from 'showcase/components/page-components/accordion/sections/variants';
import ContentSection from 'showcase/components/page-components/accordion/sections/content';
import ContextSection from 'showcase/components/page-components/accordion/sections/context';

const PageComponentsAccordion: TemplateOnlyComponent = <template>
  {{pageTitle "Accordion Component"}}

  <ShwTextH1>Accordion</ShwTextH1>

  <section data-test-percy>
    <VariantsSection />
    <ContentSection />
    <ContextSection />
    <BaseElementsSection />
  </section>
</template>;

export default PageComponentsAccordion;
