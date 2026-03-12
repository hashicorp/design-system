import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LocalComponent extends Component {
  @action
  yourOnBlurFunction() {
    console.log('Invoked "yourOnBlurFunction"');
  }
}
