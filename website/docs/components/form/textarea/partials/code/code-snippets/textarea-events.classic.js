import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked description = '';

  @action
  updateDescription(event) {
    this.description = event.target.value;
  }

  @action
  yourOnBlurFunction() {
    console.log('Invoked "yourOnBlurFunction"');
  }
}
