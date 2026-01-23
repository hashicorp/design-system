import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LocalComponent extends Component {
  @action
  yourOnClickFunction() {
    console.log('Clicked the button in the "alert"!');
  }
}
