import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class DismissButtonController extends Controller {
  @action
  onClickDismissButton() {
    console.log('`Hds::DismissButton` clicked');
  }
}
