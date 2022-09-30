import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

export default class HdsTabsIndexComponent extends Component {
  @tracked tabNodes = [];
  @tracked tabIds = [];
  @tracked panelNodes = [];
  @tracked panelIds = [];
  @tracked selectedTabIndex;

  @action
  didInsert() {
    // default starting tab index
    let initialTabIndex = 0;
    let selectedCount = 0;

    this.tabNodes.forEach((tabElement, index) => {
      if (tabElement.hasAttribute('data-is-selected')) {
        initialTabIndex = index;
        selectedCount++;
      }
    });
    this.selectedTabIndex = initialTabIndex;

    assert('Only one tab may use isSelected argument', selectedCount <= 1);

    assert(
      'The number of Tabs must be equal to the number of Panels',
      this.tabNodes.length === this.panelNodes.length
    );
  }

  @action
  didInsertTab(element) {
    this.tabNodes = [...this.tabNodes, element];
    this.tabIds = [...this.tabIds, element.id];
  }

  @action
  didInsertPanel(panelId, element) {
    this.panelNodes = [...this.panelNodes, element];
    this.panelIds = [...this.panelIds, panelId];
  }

  @action
  handleClick(tabIndex) {
    this.selectedTabIndex = tabIndex;
  }

  @action
  handleKeyUp(tabIndex, e) {
    const leftArrow = 37;
    const rightArrow = 39;
    const enterKey =	13;
    const spaceKey = 32;

    if (e.keyCode === rightArrow) {
      const nextTabIndex = (tabIndex + 1) % this.tabIds.length;
      this.focusTab(nextTabIndex, e);
    } else if (e.keyCode === leftArrow) {
      const prevTabIndex =
        (tabIndex + this.tabIds.length - 1) % this.tabIds.length;
      this.focusTab(prevTabIndex, e);
    } else if (e.keyCode === enterKey || e.keyCode === spaceKey) {
      this.selectedTabIndex = tabIndex;
    }
  }

  // Focus tab for keyboard & mouse navigation:
  focusTab(tabIndex, e) {
    e.preventDefault();
    this.tabNodes[tabIndex].focus();
  }

  setSelectedPanelFocus(tabIndex, e) {
    e.preventDefault();
    this.panelNodes[tabIndex].focus();
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-tabs'];

    return classes.join(' ');
  }
}
