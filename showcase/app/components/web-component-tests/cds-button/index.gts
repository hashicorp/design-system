/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContainers from './sub-sections/containers';
import SubSectionInteractive from './sub-sections/interactive';
import SubSectionVariants from './sub-sections/variants';

const CdsButtonIndex: TemplateOnlyComponent = <template>
  {{pageTitle "CdsButton Component"}}

  <ShwTextH1>CdsButton</ShwTextH1>

  <section data-test-percy>
    <SubSectionVariants />
    <SubSectionContainers />
  </section>

  <SubSectionInteractive />
</template>;

export default CdsButtonIndex;
