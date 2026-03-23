import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import {
  HdsStepperNav,
  HdsButton,
  HdsButtonSet,
} from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked demoButtonsCurrentStep = 0;

  demoButtonsOnStepChange = (_event: Event, stepNumber: number) => {
    this.demoButtonsCurrentStep = stepNumber;
  };

  onNextClickDemo = () => {
    this.demoButtonsCurrentStep++;
  };

  onPreviousClickDemo = () => {
    this.demoButtonsCurrentStep--;
  };

  <template>
    <HdsStepperNav
      @currentStep={{this.demoButtonsCurrentStep}}
      @ariaLabel="Component composition"
      @onStepChange={{this.demoButtonsOnStepChange}}
      as |S|
    >
      <S.Step>
        <:title>Step 1</:title>
      </S.Step>
      <S.Step>
        <:title>Step 2</:title>
      </S.Step>
      <S.Step>
        <:title>Step 3</:title>
      </S.Step>
      <S.Panel>
        Content 1
        <HdsButton @text="Next" {{on "click" this.onNextClickDemo}} />
      </S.Panel>
      <S.Panel>
        Content 2
        <HdsButtonSet>
          <HdsButton
            @text="Previous"
            @color="secondary"
            {{on "click" this.onPreviousClickDemo}}
          />
          <HdsButton @text="Next" {{on "click" this.onNextClickDemo}} />
        </HdsButtonSet>
      </S.Panel>
      <S.Panel>
        Content 3
        <HdsButton
          @text="Previous"
          @color="secondary"
          {{on "click" this.onPreviousClickDemo}}
        />
      </S.Panel>
    </HdsStepperNav>
  </template>
}
