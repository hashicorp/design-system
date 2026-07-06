/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { on } from '@ember/modifier';
import { array, fn } from '@ember/helper';
import { eq, or } from 'ember-truth-helpers';
import style from 'ember-style-modifier';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import CodeFragmentWithContextualComponents from 'showcase/components/page-components/stepper/nav/code-fragments/with-contextual-components';

import { HdsStepperNav } from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

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

      <ShwTextH2>Base elements</ShwTextH2>

      <ShwTextH3>NavStep</ShwTextH3>

      {{#let (array "non-interactive" "interactive") as |variants|}}
        {{#each variants as |variant|}}

          <ShwTextH4>{{#if (eq variant "non-interactive")}}Non-interactive{{else}}Interactive{{/if}}</ShwTextH4>

          <ShwCarbonizationComparisonGrid @layout="side-by-side">
            <:theming>
              <ShwFlex as |SF|>
                <SF.Item>
                  <HdsStepperNav
                    @currentStep={{1}}
                    @isInteractive={{if (eq variant "interactive") true false}}
                    @ariaLabel="Label"
                    as |S|
                  >
                    <S.Step>
                      <:title>Complete</:title>
                      <:description>Description</:description>
                    </S.Step>
                    <S.Panel />
                  </HdsStepperNav>
                </SF.Item>
                <SF.Item>
                  <HdsStepperNav
                    @currentStep={{0}}
                    @isInteractive={{if (eq variant "interactive") true false}}
                    @ariaLabel="Label"
                    as |S|
                  >
                    <S.Step>
                      <:title>Active</:title>
                      <:description>Description</:description>
                    </S.Step>
                    <S.Panel />
                  </HdsStepperNav>
                </SF.Item>
                <SF.Item>
                  <HdsStepperNav
                    @ariaLabel="Label"
                    @isInteractive={{if (eq variant "interactive") true false}}
                    class="shw-component-stepper-nav-step-mock-incomplete"
                    as |S|
                  >
                    <S.Step {{style display="none"}}>
                      <:title>Title</:title>
                      <:description>Description</:description>
                    </S.Step>
                    <S.Step>
                      <:title>Incomplete</:title>
                      <:description>Description</:description>
                    </S.Step>
                    <S.Panel />
                    <S.Panel />
                  </HdsStepperNav>
                </SF.Item>
              </ShwFlex>
            </:theming>
            <:reference as |R|>
              <R.NoEquivalent @isCompact={{true}} />
            </:reference>
          </ShwCarbonizationComparisonGrid>
        {{/each}}
      {{/let}}


      <ShwTextH4>Interactive States</ShwTextH4>

      <ShwTextBody>Complete</ShwTextBody>

      {{#each STATES as |state|}}
        <ShwCarbonizationComparisonGrid @label="{{state}}">
          <:theming>
            <HdsStepperNav @currentStep={{1}} @ariaLabel="Label" as |S|>
              <S.Step mock-state-value={{state}} mock-state-selector="button">
                <:title>Title</:title>
                <:description>Description</:description>
              </S.Step>
              <S.Panel />
            </HdsStepperNav>
          </:theming>
          <:reference as |R|>
            <R.NoEquivalent @isCompact={{true}} />
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}

      <ShwTextBody>Active</ShwTextBody>

      {{#each STATES as |state|}}
        {{#if (or (eq state "default") (eq state "focus"))}}
          <ShwCarbonizationComparisonGrid @label="{{state}}">
            <:theming>
              <HdsStepperNav @currentStep={{0}} @ariaLabel="Label" as |S|>
                <S.Step mock-state-value="{{state}}" mock-state-selector="button">
                  <:title>Title</:title>
                  <:description>Description</:description>
                </S.Step>
                <S.Panel />
              </HdsStepperNav>
            </:theming>
            <:reference as |R|>
              <R.NoEquivalent @isCompact={{true}} />
            </:reference>
          </ShwCarbonizationComparisonGrid>
        {{/if}}
      {{/each}}
    </section>
  </template>
}