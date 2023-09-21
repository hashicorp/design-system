/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { next, schedule } from '@ember/runloop';

export default class HdsTabsIndexComponent extends Component {
  @tracked tabNodes = [];
  @tracked tabIds = [];
  @tracked panelNodes = [];
  @tracked panelIds = [];
  @tracked selectedTabIndex;

  get selectedIndex() {
    return this.selectionControlled
      ? this.args.selectedTabIndex
      : this.selectedTabIndex;
  }

  get selectionControlled() {
    return this.args.selectedTabIndex >= 0;
  }

  @action
  didInsert() {
    // default starting tab index
    let initialTabIndex = 0;
    let selectedCount = 0;

    if (!this.selectionControlled) {
      this.tabNodes.forEach((tabElement, index) => {
        if (tabElement.hasAttribute('data-is-selected')) {
          initialTabIndex = index;
          selectedCount++;
        }
      });
      this.selectedTabIndex = initialTabIndex;
    }

    schedule('afterRender', () => {
      this.setTabIndicator();
    });

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
  willDestroyTab(element) {
    this.tabNodes = this.tabNodes.filter((node) => node.id !== element.id);
    this.tabIds = this.tabIds.filter((tabId) => tabId !== element.id);
  }

  @action
  didInsertPanel(panelId, element) {
    this.panelNodes = [...this.panelNodes, element];
    this.panelIds = [...this.panelIds, panelId];
  }

  @action
  willDestroyPanel(element) {
    this.panelNodes = this.panelNodes.filter((node) => node.id !== element.id);
    this.panelIds = this.panelIds.filter((panelId) => panelId !== element.id);
  }

  @action
  onClick(tabIndex, event) {
    this.selectedTabIndex = tabIndex;

    // Scroll Tab into view if it's out of view
    this.tabNodes[tabIndex].parentNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });

    // invoke the callback function if it's provided as argument
    if (typeof this.args.onClickTab === 'function') {
      this.args.onClickTab(event);
    }
  }

  @action
  onKeyUp(tabIndex, e) {
    const leftArrow = 37;
    const rightArrow = 39;
    const enterKey = 13;
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

  @action
  setTabIndicator() {
    const tabElem = this.tabNodes[this.selectedIndex];
    const tabsParentElem = tabElem.closest('.hds-tabs');

    next(() => {
      const tabLeftPos = tabElem.parentNode.offsetLeft;
      const tabWidth = tabElem.parentNode.offsetWidth;
      console.log(tabLeftPos, tabWidth);

      // Set CSS custom properties for indicator
      tabsParentElem.style.setProperty(
        '--indicator-left-pos',
        tabLeftPos + 'px'
      );
      tabsParentElem.style.setProperty('--indicator-width', tabWidth + 'px');
    });
  }
}
