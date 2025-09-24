/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwDivider from 'showcase/components/shw/divider';

import SubSectionFamilies from 'showcase/components/page-foundations/typography/sub-sections/families';
import SubSectionWeights from 'showcase/components/page-foundations/typography/sub-sections/weights';
import SubSectionStyles from 'showcase/components/page-foundations/typography/sub-sections/styles';
import SubSectionCarbonization from 'showcase/components/page-foundations/typography/sub-sections/carbonization';

const TypographyIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Typography"}}

  <ShwTextH1>Typography</ShwTextH1>

  <section data-test-percy>
    <SubSectionFamilies />
    <SubSectionWeights />
    <SubSectionStyles />
  </section>

  <ShwDivider />
  <ShwDivider />

  <ShwTextH1>Carbonization</ShwTextH1>

  <section>
    <SubSectionCarbonization />
  </section>
</template>;

export default TypographyIndex;
