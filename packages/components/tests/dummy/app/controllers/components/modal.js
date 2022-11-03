import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ModalController extends Controller {
  @tracked basicModalActive = false;
  @tracked formModalActive = false;

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
}
