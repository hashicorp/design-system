import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { HdsStepperNav } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked demoCurrentStep = 1;

  demoOnStepChange = (_event: Event, stepNumber: number) => {
    this.demoCurrentStep = stepNumber;
  };

  <template>
    <HdsStepperNav
      @currentStep={{this.demoCurrentStep}}
      @ariaLabel="Interactive"
      @onStepChange={{this.demoOnStepChange}}
      @interactive={{true}}
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

      <S.Panel>Content 1</S.Panel>
      <S.Panel>Content 2</S.Panel>
      <S.Panel>Content 3</S.Panel>
    </HdsStepperNav>
  </template>
}
