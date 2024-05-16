import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert, warn } from '@ember/debug';
import { schedule, next } from '@ember/runloop';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! template-lint-disable no-invalid-role }}\n<div\n  class={{this.classNames}}\n  {{did-insert this.didInsert}}\n  {{did-update this.didUpdateSelectedTabIndex this.selectedTabIndex}}\n  {{did-update this.didUpdateSelectedTabId this.selectedTabId}}\n  {{did-update this.didUpdateParentVisibility @isParentVisible}}\n  ...attributes\n>\n  <div class=\"hds-tabs__tablist-wrapper\">\n    <ul class=\"hds-tabs__tablist\" role=\"tablist\">\n      {{yield\n        (hash\n          Tab=(component\n            \"hds/tabs/tab\"\n            didInsertNode=this.didInsertTab\n            didUpdateNode=this.didUpdateTab\n            willDestroyNode=this.willDestroyTab\n            tabIds=this.tabIds\n            selectedTabIndex=this.selectedTabIndex\n            onClick=this.onClick\n            onKeyUp=this.onKeyUp\n          )\n        )\n      }}\n      <li class=\"hds-tabs__tab-indicator\" role=\"presentation\"></li>\n    </ul>\n  </div>\n\n  {{yield\n    (hash\n      Panel=(component\n        \"hds/tabs/panel\"\n        didInsertNode=this.didInsertPanel\n        willDestroyNode=this.willDestroyPanel\n        tabIds=this.tabIds\n        panelIds=this.panelIds\n        selectedTabIndex=this.selectedTabIndex\n      )\n    )\n  }}\n</div>\n{{! template-lint-enable no-invalid-role }}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_SIZE = 'medium';
const SIZES = ['medium', 'large'];
class HdsTabsIndexComponent extends Component {
  static {
    g(this.prototype, "tabNodes", [tracked], function () {
      return [];
    });
  }
  #tabNodes = (i(this, "tabNodes"), void 0);
  static {
    g(this.prototype, "tabIds", [tracked], function () {
      return [];
    });
  }
  #tabIds = (i(this, "tabIds"), void 0);
  static {
    g(this.prototype, "panelNodes", [tracked], function () {
      return [];
    });
  }
  #panelNodes = (i(this, "panelNodes"), void 0);
  static {
    g(this.prototype, "panelIds", [tracked], function () {
      return [];
    });
  }
  #panelIds = (i(this, "panelIds"), void 0);
  static {
    g(this.prototype, "_selectedTabIndex", [tracked], function () {
      return this.args.selectedTabIndex ?? 0;
    });
  }
  #_selectedTabIndex = (i(this, "_selectedTabIndex"), void 0);
  static {
    g(this.prototype, "selectedTabId", [tracked]);
  }
  #selectedTabId = (i(this, "selectedTabId"), void 0);
  static {
    g(this.prototype, "isControlled", [tracked]);
  }
  #isControlled = (i(this, "isControlled"), void 0);
  /**
   * Sets the size of Tabs
   * Accepted values: medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size() {
    let {
      size = DEFAULT_SIZE
    } = this.args;
    assert(`@size for "Hds::Tabs" must be one of the following: ${SIZES.join(', ')}; received: ${size}`, SIZES.includes(size));
    return size;
  }
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
    if (this.isControlled) ; else {
      this._selectedTabIndex = value;
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-tabs'];

    // add a class based on the @size argument
    classes.push(`hds-tabs--size-${this.size}`);
    return classes.join(' ');
  }
  didInsert() {
    assert('The number of Tabs must be equal to the number of Panels', this.tabNodes.length === this.panelNodes.length);
    if (this.selectedTabId) {
      this.selectedTabIndex = this.tabIds.indexOf(this.selectedTabId);
    }
    schedule('afterRender', () => {
      this.setTabIndicator();
    });
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
  didUpdateSelectedTabIndex() {
    schedule('afterRender', () => {
      this.setTabIndicator();
    });
  }
  static {
    n(this.prototype, "didUpdateSelectedTabIndex", [action]);
  }
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
  static {
    n(this.prototype, "didUpdateSelectedTabId", [action]);
  }
  didUpdateParentVisibility() {
    schedule('afterRender', () => {
      this.setTabIndicator();
    });
  }
  static {
    n(this.prototype, "didUpdateParentVisibility", [action]);
  }
  didInsertTab(element, isSelected) {
    this.tabNodes = [...this.tabNodes, element];
    this.tabIds = [...this.tabIds, element.id];
    if (isSelected) {
      this.selectedTabId = element.id;
    }
  }
  static {
    n(this.prototype, "didInsertTab", [action]);
  }
  didUpdateTab(tabIndex, isSelected) {
    if (isSelected) {
      this.selectedTabIndex = tabIndex;
    }
    this.setTabIndicator();
  }
  static {
    n(this.prototype, "didUpdateTab", [action]);
  }
  willDestroyTab(element) {
    this.tabNodes = this.tabNodes.filter(node => node.id !== element.id);
    this.tabIds = this.tabIds.filter(tabId => tabId !== element.id);
  }
  static {
    n(this.prototype, "willDestroyTab", [action]);
  }
  didInsertPanel(element, panelId) {
    this.panelNodes = [...this.panelNodes, element];
    this.panelIds = [...this.panelIds, panelId];
  }
  static {
    n(this.prototype, "didInsertPanel", [action]);
  }
  willDestroyPanel(element) {
    this.panelNodes = this.panelNodes.filter(node => node.id !== element.id);
    this.panelIds = this.panelIds.filter(panelId => panelId !== element.id);
  }
  static {
    n(this.prototype, "willDestroyPanel", [action]);
  }
  onClick(event, tabIndex) {
    this.selectedTabIndex = tabIndex;
    this.setTabIndicator();

    // invoke the callback function if it's provided as argument
    if (typeof this.args.onClickTab === 'function') {
      this.args.onClickTab(event, tabIndex);
    }
  }
  static {
    n(this.prototype, "onClick", [action]);
  }
  onKeyUp(tabIndex, event) {
    const leftArrow = 37;
    const rightArrow = 39;
    const enterKey = 13;
    const spaceKey = 32;
    if (event.keyCode === rightArrow) {
      const nextTabIndex = (tabIndex + 1) % this.tabIds.length;
      this.focusTab(nextTabIndex, event);
    } else if (event.keyCode === leftArrow) {
      const prevTabIndex = (tabIndex + this.tabIds.length - 1) % this.tabIds.length;
      this.focusTab(prevTabIndex, event);
    } else if (event.keyCode === enterKey || event.keyCode === spaceKey) {
      this.selectedTabIndex = tabIndex;
    }
    // scroll selected tab into view (it may be out of view when activated using a keyboard with `prev/next`)
    this.tabNodes[this.selectedTabIndex].parentNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    });
  }

  // Focus tab for keyboard & mouse navigation:
  static {
    n(this.prototype, "onKeyUp", [action]);
  }
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
          tabsParentElem.style.setProperty('--indicator-left-pos', tabLeftPos + 'px');
          tabsParentElem.style.setProperty('--indicator-width', tabWidth + 'px');
        }
      } else {
        let message;
        message += '"Hds::Tabs" has tried to set the indicator for an element that doesn\'t exist';
        if (this.tabNodes.length === 0) {
          message += ' (the array `this.tabNodes` is empty, there are no tabs, probably already destroyed)';
        } else {
          message += ` (the value ${this.selectedTabIndex} of \`this.selectedTabIndex\` is out of bound for the array \`this.tabNodes\`, whose index range is [0 - ${this.tabNodes.length - 1}])`;
        }
        // https://api.emberjs.com/ember/5.3/classes/@ember%2Fdebug/methods/warn?anchor=warn
        warn(message, true, {
          id: 'hds-debug.tabs.setTabIndicator-tabElem-not-available'
        });
      }
    });
  }
}
setComponentTemplate(TEMPLATE, HdsTabsIndexComponent);

export { DEFAULT_SIZE, SIZES, HdsTabsIndexComponent as default };
//# sourceMappingURL=index.js.map
