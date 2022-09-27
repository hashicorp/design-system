import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export default class HdsTabsIndexComponent extends Component {
  /**
   * Generates a unique ID for the Tab
   *
   * @param tabId
   */
  tabId = 'tab-' + guidFor(this);

  @cached
  get nodeIndex() {
    return this.args.tabIds.indexOf(this.tabId);
  }

  get panelId() {
    return this.args.panelIds[this.nodeIndex];
  }

  /**
   * @param isSelected
   * @type {boolean}
   * @default false (1st tab is selected by default)
   * @description Determines if the tab is the selected tab
   */
  get isSelected() {
    return this.nodeIndex === this.args.selectedTabIndex;
  }

  get isInitialTab() {
    let { isSelected } = this.args;
    return isSelected;
  }

  @action
  didInsertNode() {
    this.args.didInsertNode(...arguments);
  }

  @action
  onClick() {
    this.args.onClick(this.nodeIndex, ...arguments);
  }

  @action
  onKeyUp() {
    this.args.onKeyUp(this.nodeIndex, ...arguments);
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-tabs__tab'];

    if (this.isSelected) {
      classes.push(`hds-tabs__tab--is-selected`);
    }

    return classes.join(' ');
  }
}
