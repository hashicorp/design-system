import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LocalComponent extends Component {
  @action
  onClickDismissButton() {
    console.log('`Hds::DismissButton` clicked');
  }
}
