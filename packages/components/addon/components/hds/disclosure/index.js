import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

export default class HdsDisclosureComponent extends Component {
  @tracked isActive = this.args.isActive ?? undefined;
  @tracked isInsideToggleContainer = false;
  @tracked isDeactivatingWithClickOnTrigger = false;
  @tracked myTriggerNode;
  @tracked myEventPath = [];

  toggleId = guidFor(this);

  @action
  onClickToggle(event) {
    console.log(
      'aaa',
      event.currentTarget,
      event.target.isSameNode(this.myTriggerNode)
    );
    console.log('bbb', this.myEventPath.includes(event.currentTarget));
    console.warn(
      'onClickToggle1',
      `isActive=${this.isActive}`,
      `isInsideToggleContainer=${this.isInsideToggleContainer}`,
      `isDeactivatingWithClickOnTrigger=${this.isDeactivatingWithClickOnTrigger}`
    );
    // if (
    //   !this.isActive &&
    //   !this.isInsideToggleContainer &&
    //   !this.isDeactivatingWithClickOnTrigger
    // ) {
    //   this.isActive = true;
    // } else {
    //   this.isActive = false;
    // }
    // if (!this.isActive && this.isDeactivatingWithClickOnTrigger) {
    //   console.log('>>>>> Exception!!');
    // } else {
    //   this.isActive = !this.isActive;
    // }
    this.isActive = !this.isActive;
    this.isDeactivatingWithClickOnTrigger = false;
    this.isInsideToggleContainer = false;
    console.warn(
      'onClickToggle2',
      `isActive=${this.isActive}`,
      `isInsideToggleContainer=${this.isInsideToggleContainer}`,
      `isDeactivatingWithClickOnTrigger=${this.isDeactivatingWithClickOnTrigger}`
    );
    console.log(this.isActive ? '[OPENED]' : '[CLOSED]');
  }

  @action
  clickOutsideDeactivates(event) {
    this.isInsideToggleContainer = event.path.some(
      (node) => node.id === this.toggleId
    );
    console.log(
      'clickOutsideDeactivates',
      `isActive=${this.isActive}`,
      `isInsideToggleContainer=${this.isInsideToggleContainer}`,
      event,
      event.target,
      event.currentTarget
    );
    this.myTriggerNode = event.target;
    this.myEventPath = event.path;
    return true;
  }

  @action
  onDeactivate() {
    console.log(
      'onDeactivate1',
      `isActive=${this.isActive}`,
      `isInsideToggleContainer=${this.isInsideToggleContainer}`
    );
    // this.isActive = false;
    // this.isInsideToggleContainer = false;
    if (this.isInsideToggleContainer) {
      this.isDeactivatingWithClickOnTrigger = true;
      this.isInsideToggleContainer = false;
    }
    this.isActive = false;
    console.log(
      'onDeactivate2',
      `isActive=${this.isActive}`,
      `isInsideToggleContainer=${this.isInsideToggleContainer}`
    );
  }
}
