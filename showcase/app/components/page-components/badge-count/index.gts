/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContent from 'showcase/components/page-components/badge-count/sub-sections/content';
import SubSectionVariants from 'showcase/components/page-components/badge-count/sub-sections/variants';

const BadgeCountIndex: TemplateOnlyComponent = <template>
  {{pageTitle "BadgeCount Component"}}

  <ShwTextH1>BadgeCount</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
    <SubSectionVariants />
  </section>
</template>;

export default BadgeCountIndex;
