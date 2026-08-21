/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { eq } from 'ember-truth-helpers';
import { capitalize } from '@ember/string';
import { LinkTo } from '@ember/routing';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsStepperStepIndicator,
  HdsStepperTaskIndicator,
} from '@hashicorp/design-system-components/components';
import { STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/step/indicator';

const STATES = ['default', 'hover', 'active'];

const StepperIndicatorCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Stepper - Carbonization"}}

  <ShwTextH1>Stepper - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>StepIndicator</ShwTextH2>

    <ShwTextBody>
      ⚠️ The
      <code>Stepper::Step::Indicator</code>
      component relies on the
      <code>HdsTheming</code>
      service to render the appropriate icons for the Carbon theme. The changes
      made through the service will not be visible in this page. It is
      preferrable to view this component in the
      <LinkTo @route="page-components.stepper.indicator">main
        Stepper::Step::Indicator page</LinkTo>.
    </ShwTextBody>

    <ShwTextH3>Default</ShwTextH3>

    {{#each STATUSES as |status|}}
      <ShwCarbonizationComparisonGrid @label={{capitalize status}}>
        <:theming>
          <HdsStepperStepIndicator @status={{status}} @text="1" />
        </:theming>
        <:reference as |R|>
          {{#if (eq status "incomplete")}}
            <cds-progress-step label="Step 1"></cds-progress-step>
          {{else if (eq status "progress")}}
            <cds-progress-step label="Step 1" current></cds-progress-step>
          {{else if (eq status "processing")}}
            <R.NoEquivalent @isCompact={{true}} @entity="variant" />
          {{else if (eq status "complete")}}
            <cds-progress-step label="Step 1" complete></cds-progress-step>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>Interactive</ShwTextH3>

    {{#each STATUSES as |status|}}
      <ShwTextBody>{{capitalize status}}</ShwTextBody>
      {{#each STATES as |state|}}
        <ShwCarbonizationComparisonGrid @label={{state}}>
          <:theming>
            <HdsStepperStepIndicator
              @isInteractive={{true}}
              @status={{status}}
              @text="1"
              mock-state-value={{state}}
            />
          </:theming>
          <:reference as |R|>
            <R.NoEquivalent @isCompact={{true}} @entity="variant" />
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    {{/each}}

    <ShwDivider />

    <ShwTextH2>TaskIndicator</ShwTextH2>

    <ShwTextH3>Default</ShwTextH3>

    {{#each STATUSES as |status|}}
      <ShwCarbonizationComparisonGrid @label={{capitalize status}}>
        <:theming>
          <HdsStepperTaskIndicator @status={{status}} />
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} @entity="variant" />
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>Interactive</ShwTextH3>

    {{#each STATUSES as |status|}}
      <ShwTextBody>{{capitalize status}}</ShwTextBody>
      {{#each STATES as |state|}}
        <ShwCarbonizationComparisonGrid @label={{state}}>
          <:theming>
            <HdsStepperTaskIndicator
              @isInteractive={{true}}
              @status={{status}}
              mock-state-value={{state}}
            />
          </:theming>
          <:reference as |R|>
            <R.NoEquivalent @isCompact={{true}} @entity="variant" />
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    {{/each}}
  </section>
</template>;

export default StepperIndicatorCarbonizationIndex;
