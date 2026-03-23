import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked demoButtonsCurrentStep = 0;

  @action
  demoButtonsOnStepChange(_element, stepNumber) {
    this.demoButtonsCurrentStep = stepNumber;
  }

  @action
  onNextClickDemo() {
    this.demoButtonsCurrentStep++;
  }

  @action
  onPreviousClickDemo() {
    this.demoButtonsCurrentStep--;
  }
}
