import Component from '@glimmer/component';
import { hash, array } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
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
      @steps={{array
        (hash title="Step 1")
        (hash title="Step 2")
        (hash title="Step 3")
      }}
      @ariaLabel="Using steps argument"
      @onStepChange={{this.demoOnStepChange}}
    >
      <:body>
        {{#if (eq this.demoCurrentStep 0)}}
          Content 1
        {{else if (eq this.demoCurrentStep 1)}}
          Content 2
        {{else}}
          Content 3
        {{/if}}
        {{#if true}}
          Conditional content
        {{/if}}
      </:body>
    </HdsStepperNav>
  </template>
}
