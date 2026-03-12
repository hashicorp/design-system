/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsReveal,
  HdsRevealToggleButton,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const RevealCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Reveal - Carbonization"}}

  <ShwTextH1>Reveal - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Content</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsReveal @text="Open me" @textWhenOpen="Close me">
          <ShwPlaceholder @text="generic content" @height="40" @width="200" />
        </HdsReveal>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>States</ShwTextH2>

    <ShwTextBody>(<strong>Note:</strong>
      buttons below are inactive)</ShwTextBody>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid @label={{state}}>
        <:theming>
          <HdsRevealToggleButton
            @text="More options"
            mock-state-value={{state}}
          />
        </:theming>
      </ShwCarbonizationComparisonGrid>
    {{/each}}
  </section>
</template>;

export default RevealCarbonizationIndex;
