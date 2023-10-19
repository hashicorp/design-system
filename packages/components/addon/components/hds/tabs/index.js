/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert, warn } from '@ember/debug';
import { next, schedule } from '@ember/runloop';

export default class HdsTabsIndexComponent extends Component {
  @tracked tabNodes = [];
  @tracked tabIds = [];
  @tracked panelNodes = [];
  @tracked panelIds = [];
  @tracked _selectedTabIndex = this.args.selectedTabIndex ?? 0;
  @tracked selectedTabId;
  @tracked isControlled;

  constructor() {
    super(...arguments);

    // this is to determine if the "selected" tab logic is controlled in the consumers' code or is maintained as an internal state
    this.isControlled = this.args.selectedTabIndex !== undefined;
  }

  get selectedTabIndex() {
    if (this.isControlled) {
      return this.args.selectedTabIndex;
    } else {
      return this._selectedTabIndex;
    }
  }

  set selectedTabIndex(value) {
    if (this.isControlled) {
      // noop
    } else {
      this._selectedTabIndex = value;
    }
  }

  @action
  didInsert() {
    assert(
      'The number of Tabs must be equal to the number of Panels',
      this.tabNodes.length === this.panelNodes.length
    );

    if (this.selectedTabId) {
      this.selectedTabIndex = this.tabIds.indexOf(this.selectedTabId);
    }

    schedule('afterRender', () => {
      this.setTabIndicator();
    });
  }

  @action
  didUpdateSelectedTabIndex() {
    schedule('afterRender', () => {
      this.setTabIndicator();
    });
  }

  @action
  didUpdateSelectedTabId() {
    // if the selected tab is set dynamically (eg. in a `each` loop)
    // the `Tab` nodes will be re-inserted/rendered, which means the `this.selectedTabId` variable changes
    // but the parent `Tabs` component has already been rendered/inserted but doesn't re-render
    // so the value of the `selectedTabIndex` is not updated, unless we trigger a recalculation
    // using the `did-update` modifier that checks for changes in the `this.selectedTabId` variable
    if (this.selectedTabId) {
      this.selectedTabIndex = this.tabIds.indexOf(this.selectedTabId);
    }
  }

  @action
  didUpdateParentVisibility() {
    schedule('afterRender', () => {
      this.setTabIndicator();
    });
  }

  @action
  didInsertTab(element, isSelected) {
    this.tabNodes = [...this.tabNodes, element];
    this.tabIds = [...this.tabIds, element.id];
    if (isSelected) {
      this.selectedTabId = element.id;
    }
  }

  @action
  didUpdateTab(tabIndex, isSelected) {
    if (isSelected) {
      this.selectedTabIndex = tabIndex;
    }
    this.setTabIndicator();
  }

  @action
  willDestroyTab(element) {
    this.tabNodes = this.tabNodes.filter((node) => node.id !== element.id);
    this.tabIds = this.tabIds.filter((tabId) => tabId !== element.id);
  }

  @action
  didInsertPanel(element, panelId) {
    this.panelNodes = [...this.panelNodes, element];
    this.panelIds = [...this.panelIds, panelId];
  }

  @action
  willDestroyPanel(element) {
    this.panelNodes = this.panelNodes.filter((node) => node.id !== element.id);
    this.panelIds = this.panelIds.filter((panelId) => panelId !== element.id);
  }

  @action
  onClick(event, tabIndex) {
    this.selectedTabIndex = tabIndex;
    this.setTabIndicator();

    // invoke the callback function if it's provided as argument
    if (typeof this.args.onClickTab === 'function') {
      this.args.onClickTab(event, tabIndex);
    }
  }

  @action
  onKeyUp(tabIndex, event) {
    const leftArrow = 37;
    const rightArrow = 39;
    const enterKey = 13;
    const spaceKey = 32;

    if (event.keyCode === rightArrow) {
      const nextTabIndex = (tabIndex + 1) % this.tabIds.length;
      this.focusTab(nextTabIndex, event);
    } else if (event.keyCode === leftArrow) {
      const prevTabIndex =
        (tabIndex + this.tabIds.length - 1) % this.tabIds.length;
      this.focusTab(prevTabIndex, event);
    } else if (event.keyCode === enterKey || event.keyCode === spaceKey) {
      this.selectedTabIndex = tabIndex;
    }
    // scroll selected tab into view (it may be out of view when activated using a keyboard with `prev/next`)
    this.tabNodes[this.selectedTabIndex].parentNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
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

  setTabIndicator() {
    next(() => {
      const tabElem = this.tabNodes[this.selectedTabIndex];

      if (tabElem) {
        const tabsParentElem = tabElem.closest('.hds-tabs__tablist');

        // this condition is `null` if any of the parents has `display: none`
        if (tabElem.parentNode.offsetParent) {
          const tabLeftPos = tabElem.parentNode.offsetLeft;
          const tabWidth = tabElem.parentNode.offsetWidth;

          // Set CSS custom properties for indicator
          tabsParentElem.style.setProperty(
            '--indicator-left-pos',
            tabLeftPos + 'px'
          );
          tabsParentElem.style.setProperty(
            '--indicator-width',
            tabWidth + 'px'
          );
        }
      } else {
        let message;
        message +=
          '"Hds::Tabs" has tried to set the indicator for an element that doesn\'t exist';
        if (this.tabNodes.length === 0) {
          message +=
            ' (the array `this.tabNodes` is empty, there are no tabs, probably already destroyed)';
        } else {
          message += ` (the value ${
            this.selectedTabIndex
          } of \`this.selectedTabIndex\` is out of bound for the array \`this.tabNodes\`, whose index range is [0 - ${
            this.tabNodes.length - 1
          }])`;
        }
        // https://api.emberjs.com/ember/5.3/classes/@ember%2Fdebug/methods/warn?anchor=warn
        warn(message, true, {
          id: 'hds-debug.tabs.setTabIndicator-tabElem-not-available',
        });
      }
    });
  }
}
