import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked demoCurrentStep = 1;

  @action
  demoOnStepChange(_event, stepNumber) {
    this.demoCurrentStep = stepNumber;
  }
}
