/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';
import { array, hash } from '@ember/helper';
import type Owner from '@ember/owner';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsButton,
  HdsButtonSet,
  HdsStepperNav,
} from '@hashicorp/design-system-components/components';

import type { HdsStepperNavSignature } from '@hashicorp/design-system-components/components/hds/stepper/nav/index';

export interface CodeFragmentWithStepsArraySignature {
  Args: {
    currentStep?: number;
    isInteractive?: HdsStepperNavSignature['Args']['isInteractive'];
    isStandalone?: boolean;
  };
  Element: HdsStepperNavSignature['Element'];
}

export default class CodeFragmentWithStepsArrayComponents extends Component<CodeFragmentWithStepsArraySignature> {
  @tracked currentStep;

  constructor(owner: Owner, args: CodeFragmentWithStepsArraySignature['Args']) {
    super(owner, args);
    this.currentStep = this.args.currentStep ?? 0;
  }

  updateCurrentStep = (_event: MouseEvent, stepNumber: number) => {
    this.currentStep = stepNumber;
  };

  onNextClick = () => {
    this.currentStep++;
  };

  onPreviousClick = () => {
    this.currentStep--;
  };

  <template>
    <HdsStepperNav
      @steps={{array
        (hash title="Title" description="Description")
        (hash title="Title" description="Description")
        (hash title="Title" description="Description")
      }}
      @titleTag="h3"
      @currentStep={{this.currentStep}}
      @ariaLabel="Label"
      @onStepChange={{this.updateCurrentStep}}
      @isInteractive={{@isInteractive}}
    >
      <:body>
        {{#unless @isStandalone}}
          {{#if (eq this.currentStep 0)}}
            <ShwPlaceholder @text="Step 1: Generic content" @height="100" />
            <HdsButton
              type="button"
              @text="Next"
              @isInline={{true}}
              class="shw-component-stepper-nav-sample-form-btn"
              {{on "click" this.onNextClick}}
            />
          {{else if (eq this.currentStep 1)}}
            <ShwPlaceholder @text="Step 2: Generic content" @height="100" />
            <HdsButtonSet class="shw-component-stepper-nav-sample-form-btn">
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
            </HdsButtonSet>
          {{else}}
            <ShwPlaceholder @text="Step 3: Generic content" @height="100" />
            <HdsButton
              type="button"
              @text="Previous"
              @color="secondary"
              @isInline={{true}}
              class="shw-component-stepper-nav-sample-form-btn"
              {{on "click" this.onPreviousClick}}
            />
          {{/if}}
        {{/unless}}
      </:body>
    </HdsStepperNav>
  </template>
}
