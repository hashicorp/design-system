/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier';
import { LinkTo } from '@ember/routing';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { HdsStepperList } from '@hashicorp/design-system-components/components';
import { STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/list/step';

const StepperListCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Stepper::List - Carbonization"}}

  <ShwTextH1>Stepper::List - Carbonization</ShwTextH1>

  <ShwTextBody>
    ⚠️ The
    <code>Stepper::List</code>
    component relies on the
    <code>HdsTheming</code>
    service to render the appropriate
    <code>Stepper::Step::Indicator</code>
    icons for the Carbon theme. The changes made through the service will not be
    visible in this page. It is preferrable to view this component in the
    <LinkTo @route="page-components.stepper.list">main Stepper::List page</LinkTo>.
  </ShwTextBody>

  <ShwTextH2>Status</ShwTextH2>

  <ShwCarbonizationComparisonGrid @label="Default">
    <:theming>
      <HdsStepperList
        @titleTag="h3"
        @ariaLabel="Label"
        {{style width="200px"}}
        as |S|
      >
        <S.Step @status="complete">
          <:title>Title</:title>
          <:description>Description</:description>
          <:content>
            <ShwPlaceholder @text="Step 1: Generic content" @height="20" />
          </:content>
        </S.Step>
        <S.Step @status="complete">
          <:title>Title</:title>
          <:description>Description</:description>
          <:content>
            <ShwPlaceholder @text="Step 2: Generic content" @height="20" />
          </:content>
        </S.Step>
        <S.Step @status="progress">
          <:title>Title</:title>
          <:description>Description</:description>
          <:content>
            <ShwPlaceholder @text="Step 3: Generic content" @height="20" />
          </:content>
        </S.Step>
        <S.Step @status="incomplete">
          <:title>Title</:title>
        </S.Step>
      </HdsStepperList>
    </:theming>
    <:reference as |R|>
      <R.NoEquivalent @isCompact={{true}} />
    </:reference>
  </ShwCarbonizationComparisonGrid>

  <ShwCarbonizationComparisonGrid @label="All complete">
    <:theming>
      <HdsStepperList
        @titleTag="h3"
        {{style width="200px"}}
        @ariaLabel="Label"
        as |S|
      >
        <S.Step @status="complete">
          <:title>Title</:title>
          <:description>Description</:description>
          <:content>
            <ShwPlaceholder @text="Step 1: Generic content" @height="20" />
          </:content>
        </S.Step>
        <S.Step @status="complete">
          <:title>Title</:title>
          <:description>Description</:description>
          <:content>
            <ShwPlaceholder @text="Step 2: Generic content" @height="20" />
          </:content>
        </S.Step>
        <S.Step @status="complete">
          <:title>Title</:title>
          <:description>Description</:description>
          <:content>
            <ShwPlaceholder @text="Step 3: Generic content" @height="20" />
          </:content>
        </S.Step>
        <S.Step @status="complete">
          <:title>Title</:title>
        </S.Step>
      </HdsStepperList>
    </:theming>
    <:reference as |R|>
      <R.NoEquivalent @isCompact={{true}} />
    </:reference>
  </ShwCarbonizationComparisonGrid>

  <ShwTextH2>Base elements</ShwTextH2>

  <ShwTextH3>ListStep</ShwTextH3>

  {{#each STATUSES as |status|}}
    <ShwCarbonizationComparisonGrid @label="{{status}}">
      <:theming>
        <HdsStepperList @ariaLabel="Label" as |S|>
          <S.Step @status={{status}}>
            <:title>Title</:title>
            <:description>Description</:description>
            <:content>
              <ShwPlaceholder @text="Generic content" @height="20" />
            </:content>
          </S.Step>
        </HdsStepperList>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>
  {{/each}}
</template>;

export default StepperListCarbonizationIndex;
