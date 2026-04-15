/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContainers from './sub-sections/containers';
import SubSectionContent from './sub-sections/content';
import SubSectionVariants from './sub-sections/variants';
import SubSectionWithDynamicArgs from './sub-sections/dynamic-args';

const CdsBadgeIndex: TemplateOnlyComponent = <template>
  {{pageTitle "CdsBadge Component"}}

  <ShwTextH1>CdsBadge</ShwTextH1>

  <section data-test-percy>
    <SubSectionContainers />
    <SubSectionContent />
    <SubSectionVariants />
  </section>

  <SubSectionWithDynamicArgs />
</template>;

export default CdsBadgeIndex;
