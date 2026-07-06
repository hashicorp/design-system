/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import style from 'ember-style-modifier';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import CodeFragmentWithContextualComponents from 'showcase/components/page-components/stepper/nav/code-fragments/with-contextual-components';

export interface StepperNavCarbonizationIndexSignature {
  Element: HTMLElement;
}

export default class StepperNavCarbonizationIndex extends Component<StepperNavCarbonizationIndexSignature> {
  onChange = (event: Event): void => {
    console.log("step changed");
  };

  <template>
    {{pageTitle "Stepper::Nav - Carbonization"}}

    <ShwTextH1>Stepper::Nav - Carbonization</ShwTextH1>

    <section>
      <ShwTextH2>Interactivity</ShwTextH2>

      <ShwTextH3>Interactive</ShwTextH3>

      <ShwCarbonizationComparisonGrid @layout="column">
        <:theming>
          <div {{style paddingTop="1rem"}}>
            <CodeFragmentWithContextualComponents @currentStep={{1}} />
          </div>
        </:theming>
        <:reference>
          <div {{style paddingBottom="1rem"}}>
            <cds-progress-indicator
              space-equally
              current-index="1"
              onChange={{(fn this.onChange)}}
            >
              <cds-progress-step
                label="Title"
                secondary-label="Description"
                complete=""
              ></cds-progress-step>
              <cds-progress-step
                label="Title"
                secondary-label="Description"
                current=""
              ></cds-progress-step>
              <cds-progress-step
                label="Title"
                secondary-label="Description"
              ></cds-progress-step>
            </cds-progress-indicator>
          </div>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH3>Non-interactive</ShwTextH3>

      <ShwCarbonizationComparisonGrid @label="Non-inteteractive" @layout="column">
        <:theming>
          <div {{style paddingTop="1rem"}}>
            <CodeFragmentWithContextualComponents @currentStep={{1}} @isInteractive={{false}} />
          </div>
        </:theming>
        <:reference>
          <div {{style paddingBottom="1rem"}}>
            <cds-progress-indicator
              space-equally
              current-index="1"
            >
              <cds-progress-step
                label="Title"
                secondary-label="Description"
                complete=""
              ></cds-progress-step>
              <cds-progress-step
                label="Title"
                secondary-label="Description"
                current=""
              ></cds-progress-step>
              <cds-progress-step
                label="Title"
                secondary-label="Description"
              ></cds-progress-step>
            </cds-progress-indicator>
          </div>
        </:reference>
      </ShwCarbonizationComparisonGrid>

    </section>
  </template>
}