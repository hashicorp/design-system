import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class DialogController extends Controller {
  // notice: this is used as "noop" function for the onClose callback of the Dialog component
  @action
  noop() {
    console.log('noop');
  }
}
