import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HdsDisclosureComponent extends Component {
  @tracked isActive; // notice: if in the future we need to add a "@isActive" prop to control the status from outside (eg to have the Disclosure opened on render) just add  "this.args.isActive" here to initalize the variable
  @tracked toggleRef;
  @tracked isToggleClicked;

  @action
  didInsert(element) {
    this.element = element;
  }

  @action
  onClickToggle(event) {
    // we store a reference to the DOM node that has the "onClickToggle" event associated with it
    if (!this.toggleRef) {
      this.toggleRef = event.currentTarget;
    }
    this.isActive = !this.isActive;
  }

  @action
  onFocusOut(event) {
    if (
      !event.relatedTarget || // click or tap a non-related target (e.g. outside the element)
      !this.element.contains(event.relatedTarget) // move focus to a target outside the element
    ) {
      this.deactivate();
    }
  }

  @action
  deactivate() {
    if (this.isActive) {
      this.isActive = false;
    }
    // we call the "onClose" callback if it exists (and is a function)
    if (this.args.onClose && typeof this.args.onClose === 'function') {
      this.args.onClose();
    }
  }
}
