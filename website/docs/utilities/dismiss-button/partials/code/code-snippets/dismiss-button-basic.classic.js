import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class Index extends Component {
  @action
  onClickDismissButton() {
    console.log('`Hds::DismissButton` clicked');
  }
}
