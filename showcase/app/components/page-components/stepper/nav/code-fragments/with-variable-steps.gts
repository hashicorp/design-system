/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { eq, and } from 'ember-truth-helpers';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsButton,
  HdsStepperNav,
} from '@hashicorp/design-system-components/components';

import type { HdsStepperNavSignature } from '@hashicorp/design-system-components/components/hds/stepper/nav/index';

const STEP_1 = {
  title: 'Step 1',
};

const STEP_2 = {
  title: 'Step 2',
};

const STEP_NEW = {
  title: 'Step New',
};

const STEP_LAST = {
  title: 'Step Last',
};

export interface CodeFragmentWithStepsArraySignature {
  Args: {
    currentStep?: number;
  };
  Element: HdsStepperNavSignature['Element'];
}

export default class CodeFragmentWithStepsArrayComponents extends Component<CodeFragmentWithStepsArraySignature> {
  @tracked currentStep = this.args.currentStep ?? 0;
  @tracked steps = [STEP_1, STEP_2, STEP_LAST];

  updateCurrentStep = (_event: MouseEvent, stepNumber: number) => {
    this.currentStep = stepNumber;
  };

  onNextClick = () => {
    if (this.currentStep === 0) {
      this.steps = [STEP_1, STEP_2, STEP_LAST];
    }
    this.currentStep++;
  };

  onPreviousClick = () => {
    this.currentStep--;
  };

  onNextAddStepsClick = () => {
    this.currentStep++;
    this.steps = [STEP_1, STEP_2, STEP_NEW, STEP_LAST];
  };

  <template>
    <HdsStepperNav
      @steps={{this.steps}}
      @titleTag="h3"
      @currentStep={{this.currentStep}}
      @ariaLabel="Label"
      @onStepChange={{this.updateCurrentStep}}
    >
      <:body>
        {{#if (eq this.currentStep 0)}}
          <ShwPlaceholder @text="Step 1: Generic content" @height="100" />
          <div class="shw-component-stepper-nav-sample-form-btn">
            <HdsButton
              type="button"
              @text="Next: No new step"
              @isInline={{true}}
              {{on "click" this.onNextClick}}
            />
            <HdsButton
              type="button"
              @text="Next: Step added"
              @color="secondary"
              @isInline={{true}}
              {{on "click" this.onNextAddStepsClick}}
            />
          </div>
        {{else if (eq this.currentStep 1)}}
          <ShwPlaceholder @text="Step 2: Generic content" @height="100" />
          <div class="shw-component-stepper-nav-sample-form-btn">
            <HdsButton
              type="button"
              @text="Previous"
              @color="secondary"
              @isInline={{true}}
              {{on "click" this.onPreviousClick}}
            />
            <HdsButton
              type="button"
              @text="Next"
              @isInline={{true}}
              {{on "click" this.onNextClick}}
            />
          </div>
        {{else if (and (eq this.currentStep 2) (eq this.steps.length 4))}}
          <ShwPlaceholder @text="New step: Generic content" @height="100" />
          <div class="shw-component-stepper-nav-sample-form-btn">
            <HdsButton
              type="button"
              @text="Previous"
              @color="secondary"
              @isInline={{true}}
              {{on "click" this.onPreviousClick}}
            />
            <HdsButton
              type="button"
              @text="Next"
              @isInline={{true}}
              {{on "click" this.onNextClick}}
            />
          </div>
        {{else}}
          <ShwPlaceholder @text="Last Step: Generic content" @height="100" />
          <HdsButton
            type="button"
            @text="Previous"
            @color="secondary"
            @isInline={{true}}
            class="shw-component-stepper-nav-sample-form-btn"
            {{on "click" this.onPreviousClick}}
          />
        {{/if}}
      </:body>
    </HdsStepperNav>
  </template>
}
