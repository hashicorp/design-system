import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export default class HdsTabsIndexComponent extends Component {
  /**
   * Generates a unique ID for the Panel
   *
   * @param panelId
   */
  panelId = 'panel-' + guidFor(this);

  @cached
  get nodeIndex() {
    return this.args.panelIds.indexOf(this.panelId);
  }

  get tabId() {
    return this.args.tabIds[this.nodeIndex];
  }

  get isSelected() {
    return this.nodeIndex === this.args.selectedIndex;
  }

  @action
  didInsertNode(element) {
    this.elementId = element.id;
    if (typeof this.args.didInsertNode === 'function') {
      this.args.didInsertNode(this.elementId, ...arguments);
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-tabs__panel'];

    // add a class based on the @xxx argument
    // classes.push(`hds-tabs--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
