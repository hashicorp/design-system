import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class Index extends Component {
  @action
  yourOnBlurFunction() {
    console.log('Invoked "yourOnBlurFunction"');
  }
}
