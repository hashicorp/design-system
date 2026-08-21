/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { array } from '@ember/helper';
import { eq, or } from 'ember-truth-helpers';
import style from 'ember-style-modifier';
import NOOP from 'showcase/utils/noop';
import { LinkTo } from '@ember/routing';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { HdsStepperNav } from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

export interface StepperNavCarbonizationIndexSignature {
  Element: HTMLElement;
}

const StepperNavCarbonizationIndex: TemplateOnlyComponent<StepperNavCarbonizationIndexSignature> =
  <template>
    {{pageTitle "Stepper::Nav - Carbonization"}}

    <ShwTextH1>Stepper::Nav - Carbonization</ShwTextH1>

    <ShwTextBody>
      ⚠️ The
      <code>Stepper::Nav</code>
      component relies on the
      <code>HdsTheming</code>
      service to render the appropriate
      <code>Stepper::Step::Indicator</code>
      icons, and progress bar width for the Carbon theme. The changes made
      through the service will not be visible in this page. It is preferrable to
      view this component in the
      <LinkTo @route="page-components.stepper.nav">main Stepper::Nav page</LinkTo>.
    </ShwTextBody>

    <section>
      <ShwTextH2>Interactivity</ShwTextH2>

      <ShwTextH3>Interactive</ShwTextH3>

      <ShwCarbonizationComparisonGrid @layout="column">
        <:theming>
          <HdsStepperNav
            @currentStep={{1}}
            @ariaLabel="Label"
            @isInteractive={{true}}
            as |S|
          >
            <S.Step>
              <:title>Title</:title>
              <:description>Description</:description>
            </S.Step>
            <S.Step>
              <:title>Title</:title>
              <:description>Description</:description>
            </S.Step>
            <S.Step>
              <:title>Title</:title>
              <:description>Description</:description>
            </S.Step>
            <S.Panel />
            <S.Panel />
            <S.Panel />
          </HdsStepperNav>
        </:theming>
        <:reference>
          <div {{style paddingBottom="1rem"}}>
            <cds-progress-indicator
              space-equally
              current-index="1"
              {{! @glint-expect-error - onChange HTML attribute is needed for interactive progress indicator }}
              onChange={{NOOP}}
              class="cds-progress-indicator--interactive"
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

      <ShwCarbonizationComparisonGrid @label="Non-interactive" @layout="column">
        <:theming>
          <HdsStepperNav
            @currentStep={{1}}
            @ariaLabel="Label"
            @isInteractive={{false}}
            as |S|
          >
            <S.Step>
              <:title>Title</:title>
              <:description>Description</:description>
            </S.Step>
            <S.Step>
              <:title>Title</:title>
              <:description>Description</:description>
            </S.Step>
            <S.Step>
              <:title>Title</:title>
              <:description>Description</:description>
            </S.Step>
            <S.Panel />
            <S.Panel />
            <S.Panel />
          </HdsStepperNav>
        </:theming>
        <:reference>
          <div {{style paddingBottom="1rem"}}>
            <cds-progress-indicator space-equally current-index="1">
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

          <ShwTextH4>{{#if
              (eq variant "non-interactive")
            }}Non-interactive{{else}}Interactive{{/if}}</ShwTextH4>

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
                <S.Step
                  mock-state-value="{{state}}"
                  mock-state-selector="button"
                >
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
  </template>;

export default StepperNavCarbonizationIndex;
