import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HdsDisclosureComponent extends Component {
  @tracked isOpen; // notice: if in the future we need to add a "@isOpen" prop to control the status from outside (eg to have the Disclosure opened on render) just add  "this.args.isOpen" here to initalize the variable
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
    this.isOpen = !this.isOpen;
    // we explicitly apply a focus state to the toggle element to overcome a bug in WebKit (see b8abfcf)
    this.toggleRef.focus();
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
  onKeyUp(event) {
    if (event.key === 'Escape') {
      this.deactivate();
      this.toggleRef.focus();
    }
  }

  @action
  deactivate() {
    if (this.isOpen) {
      this.isOpen = false;
    }
    // we call the "onClose" callback if it exists (and is a function)
    if (this.args.onClose && typeof this.args.onClose === 'function') {
      this.args.onClose();
    }
  }
}
