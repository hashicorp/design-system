import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class Index extends Component {
  @action
  noop() {
    //
  }

  @action
  yourOnDismissFunction() {
    console.log('Clicked the "dismiss" button in the "toast"!');
  }
}
