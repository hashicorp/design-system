/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import CodeFragmentWithActionVariants from '../../../page-components/application-state/code-fragments/with-action-variants';

const ApplicationStateCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "ApplicationState - Carbonization"}}

  <ShwTextH1>ApplicationState - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Content</ShwTextH2>

    <ShwCarbonizationComparisonGrid
      @label="With icon and error code"
      @layout="side-by-side"
    >
      <:theming>
        <CodeFragmentWithActionVariants
          @hasPrimaryAction={{true}}
          @primaryActionText="Retry"
          @hasSecondaryAction={{true}}
          @secondaryActionText="Contact us"
          @hasStandaloneLink={{true}}
        />
      </:theming>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default ApplicationStateCarbonizationIndex;
