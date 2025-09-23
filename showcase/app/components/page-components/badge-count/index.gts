/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwDivider from 'showcase/components/shw/divider';

import SubSectionContent from 'showcase/components/page-components/badge-count/sub-sections/content';
import SubSectionVariants from 'showcase/components/page-components/badge-count/sub-sections/variants';
import SubSectionCarbonization from 'showcase/components/page-components/badge-count/sub-sections/carbonization';

const BadgeCountIndex: TemplateOnlyComponent = <template>
  {{pageTitle "BadgeCount Component"}}

  <ShwTextH1>BadgeCount</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
    <SubSectionVariants />
  </section>

  <ShwDivider />
  <ShwDivider />

  <ShwTextH1>Carbonization</ShwTextH1>

  <section>
    <SubSectionCarbonization />
  </section>
</template>;

export default BadgeCountIndex;
