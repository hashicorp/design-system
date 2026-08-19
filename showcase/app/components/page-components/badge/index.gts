/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContent from 'showcase/components/page-components/badge/sub-sections/content';
import SubSectionVariants from 'showcase/components/page-components/badge/sub-sections/variants';

const BadgeIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Badge Component"}}

  <ShwTextH1>Badge</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
    <SubSectionVariants />
  </section>
</template>;

export default BadgeIndex;
