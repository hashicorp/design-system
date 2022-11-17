import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ModalController extends Controller {
  @tracked basicModalActive = false;
  @tracked formModalActive = false;
  @tracked formChanged = false;

  @action
  activateModal(modal) {
    this.formChanged = false;
    this[modal] = true;
    document.body.style.overflow = 'hidden';
  }

  @action
  deactivateModal(modal) {
    this[modal] = false;
    document.body.style.overflow = 'auto';
  }

  @action markFormAsChanged() {
    this.formChanged = true;
  }

  @action checkBeforeDeactivate(modal) {
    if (this.formChanged) {
      if (window.confirm('Changes that you made may not be saved')) {
        this.deactivateModal(modal);
      } else {
        return false;
      }
    } else {
      this.deactivateModal(modal);
    }
  }
}
