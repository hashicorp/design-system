/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { HdsSeparator } from '@hashicorp/design-system-components/components';

const SeparatorCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Separator - Carbonization"}}

  <ShwTextH1>Separator - Carbonization</ShwTextH1>

  <ShwTextH2>Examples (no Carbon equivalent)</ShwTextH2>

  <section>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsSeparator />
      </:theming>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default SeparatorCarbonizationIndex;
