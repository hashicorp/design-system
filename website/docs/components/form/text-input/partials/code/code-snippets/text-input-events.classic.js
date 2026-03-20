import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class LocalComponent extends Component {
  @action
  yourOnBlurFunction() {
    console.log('Input blurred');
  }
}
