import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DialogController extends Controller {
  @tracked basicDialogActive = false;
  @tracked formDialogActive = false;

  @action
  activateModal(modal) {
    this[modal] = true;
    document.body.style.overflow = 'hidden';
  }

  @action
  deactivateModal(modal) {
    this[modal] = false;
    document.body.style.overflow = 'auto';
  }

  @action
  noop() {
    console.log('noop');
  }
}
