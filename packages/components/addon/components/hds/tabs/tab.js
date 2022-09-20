import Component from '@glimmer/component';
import { A } from '@ember/array';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export default class HdsTabsIndexComponent extends Component {
  /**
   * Generates a unique ID for the Tab
   *
   * @param tabId
   */
  tabId = 'tab-' + guidFor(this);

  get nodeIndex() {
    return A(this.args.tabIds).indexOf(this.tabId);
  }

  get panelId() {
    return A(this.args.panelIds)[this.nodeIndex];
  }

  get isSelected() {
    return this.nodeIndex === this.args.selectedIndex;
  }

  @action
  didInsertNode(element) {
    this.elementId = element.id;
    let { isSelected } = this.args;
    this.args.didInsertNode(this.elementId, isSelected, ...arguments);
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
      classes.push(`hds-tabs__tab--is-current`);
    }

    return classes.join(' ');
  }
}
