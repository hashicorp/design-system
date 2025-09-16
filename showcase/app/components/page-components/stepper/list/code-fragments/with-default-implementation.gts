/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';
import type Owner from '@ember/owner';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsButton,
  HdsButtonSet,
  HdsStepperList,
} from '@hashicorp/design-system-components/components';

import type { HdsStepperStatuses } from '@hashicorp/design-system-components/components/hds/stepper/types';
import type { HdsStepperListSignature } from '@hashicorp/design-system-components/components/hds/stepper/list/index';

type ListData = {
  title: string;
  status: HdsStepperStatuses;
  description: string;
};

const STEP_DATA: ListData[] = [
  {
    title: 'Step 1',
    status: 'complete',
    description: 'Description for Step 1',
  },
  {
    title: 'Step 2',
    status: 'progress',
    description: 'Description for Step 2',
  },
  {
    title: 'Step 3',
    status: 'incomplete',
    description: 'Description for Step 3',
  },
];

export interface CodeFragmentWithDefaultImplementationSignature {
  Args: {
    currentStep?: number;
    isProcessing?: boolean;
  };
  Element: HdsStepperListSignature['Element'];
}

export default class CodeFragmentWithDefaultImplementationComponents extends Component<CodeFragmentWithDefaultImplementationSignature> {
  @tracked currentStep;
  @tracked steps = STEP_DATA;

  constructor(
    owner: Owner,
    args: CodeFragmentWithDefaultImplementationSignature['Args'],
  ) {
    super(owner, args);
    this.currentStep = this.args.currentStep ?? 0;
  }

  updateSteps = () => {
    const stepsNew = structuredClone(this.steps);
    stepsNew.forEach((step, index) => {
      if (index < this.currentStep) {
        step.status = 'complete';
      } else if (index === this.currentStep) {
        step.status = 'progress';
      } else {
        step.status = 'incomplete';
      }
    });
    this.steps = [...stepsNew];
  };

  updateStepsProcessing = () => {
    const stepsNew = structuredClone(this.steps);
    stepsNew.forEach((step, index) => {
      if (index < this.currentStep) {
        step.status = 'complete';
      } else if (index === this.currentStep) {
        step.status = 'processing';
      } else {
        step.status = 'incomplete';
      }
    });
    this.steps = [...stepsNew];
  };

  onNextClick = () => {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
      this.updateSteps();
    }
  };

  onNextClickProcessing = () => {
    if (this.currentStep < this.steps.length) {
      this.updateStepsProcessing();
      window.setTimeout(() => {
        this.currentStep++;
        this.updateSteps();
      }, 3000);
    }
  };

  onPreviousClick = () => {
    if (this.currentStep >= 0) {
      this.currentStep--;
      this.updateSteps();
    }
  };

  <template>
    <HdsStepperList
      @titleTag="h3"
      @ariaLabel="Label"
      {{style width="200px"}}
      as |S|
    >
      {{#each this.steps as |step|}}
        <S.Step @status={{step.status}}>
          <:title>{{step.title}}</:title>
          <:description>{{step.description}}</:description>
          <:content>
            <ShwPlaceholder @text="Generic content" @height="20" />
          </:content>
        </S.Step>
      {{/each}}
    </HdsStepperList>
    <HdsButtonSet class="shw-component-stepper-list-sample-form-btn">
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
        {{on
          "click"
          (if @isProcessing this.onNextClickProcessing this.onNextClick)
        }}
      />
    </HdsButtonSet>
  </template>
}
