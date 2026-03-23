import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LocalComponent extends Component {
  @action
  yourOnDismissFunction() {
    console.log('Clicked the "dismiss" button in the "toast"!');
  }
}
