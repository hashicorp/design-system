import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ModalController extends Controller {
  @tracked basicModalActive = false;
  @tracked formModalActive = false;
  @tracked isModalDismissDisabled = false;

  @action
  activateModal(modal) {
    this.isModalDismissDisabled = false;
    this[modal] = true;
    document.body.style.overflow = 'hidden';
  }

  @action
  deactivateModal(modal) {
    this.isModalDismissDisabled = false;
    this[modal] = false;
    document.body.style.overflow = 'auto';
  }

  @action markFormAsChanged() {
    this.isModalDismissDisabled = true;
  }

  @action saveFormAndClose(modal) {
    this.isModalDismissDisabled = false;
    this.deactivateModal(modal);
  }

  @action checkBeforeDeactivate(modal) {
    if (this.isModalDismissDisabled) {
      if (window.confirm('Changes that you made may not be saved')) {
        this.deactivateModal(modal);
      }
    } else {
      this.deactivateModal(modal);
    }
  }
}
