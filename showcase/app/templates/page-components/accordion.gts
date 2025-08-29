/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionVariants from './accordion/sub-sections/variants';
import SubSectionContent from './accordion/sub-sections/content';
import SubSectionContext from './accordion/sub-sections/context';
import SubSectionBaseElements from './accordion/sub-sections/base-elements';

const PageComponentsAccordion: TemplateOnlyComponent<{}> =
  <template>
    {{pageTitle "Accordion Component"}}

    <ShwTextH1>Accordion</ShwTextH1>

    <section data-test-percy>
      <SubSectionVariants />
      <SubSectionContent />
      <SubSectionContext />
      <SubSectionBaseElements />
    </section>

  </template>;

export default PageComponentsAccordion;
