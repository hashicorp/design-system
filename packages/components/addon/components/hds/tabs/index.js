import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HdsTabsIndexComponent extends Component {
  @tracked tabNodes = [];
  @tracked tabIds = [];
  @tracked panelNodes = [];
  @tracked panelIds = [];
  @tracked selectedIndex = 0;

  @action
  didInsertTab(isSelected, element) {
    this.tabNodes = [...this.tabNodes, element]
    this.tabIds = [...this.tabIds, element.id]

    // Set a custom initially selected tab if provided:
    if (isSelected) {
      this.setSelectedTabIndex(this.tabIds.length - 1);
    }
  }

  @action
  didInsertPanel(panelId, element) {
    this.panelNodes = [...this.panelNodes, element];
    this.panelIds = [...this.panelIds, panelId];
  }

  @action
  handleClick(index, e) {
    e.preventDefault();
    this.setSelectedTabIndex(index);
  }

  @action
  handleKeyUp(index, e) {
    const leftArrow = 37;
    const rightArrow = 39;
    const downArrow = 40;

    if (e.keyCode === rightArrow) {
      if (index < this.tabIds.length - 1) {
        index++;
        this.selectTab(index, e);
      }
    } else if (e.keyCode === leftArrow) {
      if (index > 0) {
        index--;
        this.selectTab(index, e);
      }
    } else if (e.keyCode === downArrow) {
      this.setSelectedPanelFocus(index, e);
    }
  }

  setSelectedTabIndex(index) {
    this.selectedIndex = index;
  }

  // Select tab for keyboard & mouse navigation:
  selectTab(index, e) {
    e.preventDefault();
    this.setSelectedTabIndex(index);
    this.tabNodes[index].focus();
  }

  setSelectedPanelFocus(index, e) {
    e.preventDefault();
    this.panelNodes[index].focus();
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
