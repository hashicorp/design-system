import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ButtonDisabled extends Component {
  @action
  alertOnClick() {
    alert('Hello from Helios!');
  }
}
