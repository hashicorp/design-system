import Component from '@glimmer/component';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HdsTabsIndexComponent extends Component {
  // UNCOMMENT THIS IF YOU NEED A CONSTRUCTOR
  // constructor() {
  //   super(...arguments);
  //   // ADD YOUR ASSERTIONS HERE
  // }

  @tracked tabNodes = A([]);
  @tracked tabIds = A([]);
  @tracked panelNodes = A([]);
  @tracked panelIds = A([]);

  @action
  didInsertTab(tabId, element) {
    this.tabNodes = A([...this.tabNodes, element]);
    this.tabIds = A([...this.tabIds, tabId]);
  }

  @action
  didInsertPanel(panelId, element) {
    this.panelNodes = A([...this.panelNodes, element]);
    this.panelIds = A([...this.panelIds, panelId]);
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-tabs'];

    // add a class based on the @xxx argument
    // classes.push(`hds-tabs--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
