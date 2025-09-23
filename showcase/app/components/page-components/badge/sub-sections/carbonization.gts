/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

const SubSectionCarbonization: TemplateOnlyComponent = <template>
  <ShwDivider />
  <ShwDivider />

  <ShwTextH2>Carbonization</ShwTextH2>

  <ShwCarbonizationComparisonGrid>
    <:label>Yielded label</:label>
    <:themed>
      Themed content
    </:themed>
    <:reference>
      Reference content
    </:reference>
  </ShwCarbonizationComparisonGrid>
</template>;

export default SubSectionCarbonization;
