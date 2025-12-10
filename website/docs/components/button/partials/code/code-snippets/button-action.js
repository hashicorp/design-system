import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ButtonAction extends Component {
  @action
  alertOnClick() {
    alert('Hello from Helios!');
  }
}
