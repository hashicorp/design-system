import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HdsDisclosureComponent extends Component {
  @tracked isActive; // notice: if in the future we need to add a "@isActive" prop to control the status from outside (eg to have the Disclosure opened on render) just add  "this.args.isActive" here to initalize the variable
  @tracked toggleRef;
  @tracked isToggleClicked;

  @action
  onClickToggle(event) {
    // we store a reference to the DOM node that has the "onClickToggle" event associated with it
    if (!this.toggleRef) {
      this.toggleRef = event.currentTarget;
    }
    this.isActive = !this.isActive;
  }

  @action
  clickOutsideDeactivates(event) {
    // we check if the toggle reference belongs to the tree of parent DOM nodes
    // of the element that was clicked and triggered the "click outside" event handling
    this.isToggleClicked = event.path.includes(this.toggleRef);
    // here we need to return `true` to make sure that the focus trap will be deactivated (and allow the click event to do its thing (i.e. to pass-through to the element that was clicked).
    // see: https://github.com/focus-trap/focus-trap#createoptions
    return true;
  }

  @action
  onDeactivate() {
    // on deactivate we hide the content, except for the case when the button has been clicked
    // the reason is that the "onClickToggle" is called in any case (there's no way to block the event)
    // so when the user clicks the toggle to close the panel, we let the "onClickToggle" handle the closure
    // otherwise we would have two changes of status, this and the toggle, and the panel would remain open
    if (!this.isToggleClicked) {
      this.isActive = false;
      // we need to reset this check
      this.isToggleClicked = false;
    }
  }
}
