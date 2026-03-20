import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LocalComponent extends Component {
  @action
  onClickButton() {
    console.log('Clicked the button!');
  }
}
