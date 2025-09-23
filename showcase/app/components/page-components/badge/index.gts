/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContainers from 'showcase/components/page-components/badge/sub-sections/containers';
import SubSectionContent from 'showcase/components/page-components/badge/sub-sections/content';
import SubSectionVariants from 'showcase/components/page-components/badge/sub-sections/variants';
import SubSectionCarbonization from 'showcase/components/page-components/badge/sub-sections/carbonization';

const BadgeIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Badge Component"}}

  <ShwTextH1>Badge</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
    <SubSectionVariants />
    <SubSectionContainers />
    <SubSectionCarbonization />
  </section>
</template>;

export default BadgeIndex;
