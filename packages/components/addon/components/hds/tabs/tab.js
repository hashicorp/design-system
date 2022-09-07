import Component from '@glimmer/component';
// import { A } from '@ember/array';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export default class HdsTabsIndexComponent extends Component {
  /**
   * Generates a unique ID for the Tab
   *
   * @param tabId
   */
  tabId = 'tab-' + guidFor(this);

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
    let classes = ['hds-tabs__tab'];

    // add a class based on the @xxx argument
    // classes.push(`hds-tabs--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
