/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import type Owner from '@ember/owner';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsButton,
  HdsButtonSet,
  HdsStepperNav,
} from '@hashicorp/design-system-components/components';

import type { HdsStepperNavSignature } from '@hashicorp/design-system-components/components/hds/stepper/nav/index';

export interface CodeFragmentWithContextualComponentsSignature {
  Args: {
    currentStep?: number;
    isInteractive?: HdsStepperNavSignature['Args']['isInteractive'];
    isStandalone?: boolean;
  };
  Element: HdsStepperNavSignature['Element'];
}

export default class CodeFragmentWithContextualComponents extends Component<CodeFragmentWithContextualComponentsSignature> {
  @tracked currentStep;

  constructor(
    owner: Owner,
    args: CodeFragmentWithContextualComponentsSignature['Args'],
  ) {
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
      @titleTag="h3"
      @currentStep={{this.currentStep}}
      @ariaLabel="Label"
      @onStepChange={{this.updateCurrentStep}}
      @isInteractive={{@isInteractive}}
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
      {{#unless @isStandalone}}
        <S.Panel>
          <ShwPlaceholder @text="Step 1: Generic content" @height="100" />
          <HdsButton
            type="button"
            @text="Next"
            @isInline={{true}}
            class="shw-component-stepper-nav-sample-form-btn"
            {{on "click" this.onNextClick}}
          />
        </S.Panel>
        <S.Panel>
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
        </S.Panel>
        <S.Panel>
          <ShwPlaceholder @text="Step 3: Generic content" @height="100" />
          <HdsButton
            type="button"
            @text="Previous"
            @color="secondary"
            @isInline={{true}}
            class="shw-component-stepper-nav-sample-form-btn"
            {{on "click" this.onPreviousClick}}
          />
        </S.Panel>
      {{/unless}}
    </HdsStepperNav>
  </template>
}
