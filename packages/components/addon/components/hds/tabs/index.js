import Component from '@glimmer/component';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HdsTabsIndexComponent extends Component {
  @tracked tabNodes = A([]);
  @tracked tabIds = A([]);
  @tracked panelNodes = A([]);
  @tracked panelIds = A([]);
  @tracked selectedIndex = 0; // isSelected, 0 = default

  @action
  didInsertTab(isSelected, element) {
    this.tabNodes = A([...this.tabNodes, element]);
    this.tabIds = A([...this.tabIds, element.id]);

    // Set a custom initially selected tab if provided:
    if (isSelected) {
      this.setSelectedTabIndex(this.tabIds.length - 1);
    }
  }

  @action
  didInsertPanel(panelId, element) {
    this.panelNodes = A([...this.panelNodes, element]);
    this.panelIds = A([...this.panelIds, panelId]);
  }

  @action
  handleClick(index, e) {
    this.selectTab(index, e);
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
      e.preventDefault();
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

  setSelectedPanelFocus(index) {
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
