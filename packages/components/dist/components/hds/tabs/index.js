import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert, warn } from '@ember/debug';
import { schedule, next } from '@ember/runloop';
import { HdsTabsSizeValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! template-lint-disable no-invalid-role }}\n<div\n  class={{this.classNames}}\n  {{did-insert this.didInsert}}\n  {{did-update this.didUpdateSelectedTabIndex this.selectedTabIndex}}\n  {{did-update this.didUpdateSelectedTabId this._selectedTabId}}\n  {{did-update this.didUpdateParentVisibility @isParentVisible}}\n  ...attributes\n>\n  <div class=\"hds-tabs__tablist-wrapper\">\n    <ul class=\"hds-tabs__tablist\" role=\"tablist\">\n      {{yield\n        (hash\n          Tab=(component\n            \"hds/tabs/tab\"\n            didInsertNode=this.didInsertTab\n            didUpdateNode=this.didUpdateTab\n            willDestroyNode=this.willDestroyTab\n            tabIds=this._tabIds\n            panelIds=this._panelIds\n            selectedTabIndex=this.selectedTabIndex\n            onClick=this.onClick\n            onKeyUp=this.onKeyUp\n          )\n        )\n      }}\n      <li class=\"hds-tabs__tab-indicator\" role=\"presentation\"></li>\n    </ul>\n  </div>\n\n  {{yield\n    (hash\n      Panel=(component\n        \"hds/tabs/panel\"\n        didInsertNode=this.didInsertPanel\n        willDestroyNode=this.willDestroyPanel\n        tabIds=this._tabIds\n        panelIds=this._panelIds\n        selectedTabIndex=this.selectedTabIndex\n      )\n    )\n  }}\n</div>\n{{! template-lint-enable no-invalid-role }}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_SIZE = 'medium';
const SIZES = Object.values(HdsTabsSizeValues);
class HdsTabs extends Component {
  static {
    g(this.prototype, "_tabNodes", [tracked], function () {
      return [];
    });
  }
  #_tabNodes = (i(this, "_tabNodes"), undefined);
  static {
    g(this.prototype, "_tabIds", [tracked], function () {
      return [];
    });
  }
  #_tabIds = (i(this, "_tabIds"), undefined);
  static {
    g(this.prototype, "_panelNodes", [tracked], function () {
      return [];
    });
  }
  #_panelNodes = (i(this, "_panelNodes"), undefined);
  static {
    g(this.prototype, "_panelIds", [tracked], function () {
      return [];
    });
  }
  #_panelIds = (i(this, "_panelIds"), undefined);
  static {
    g(this.prototype, "_selectedTabIndex", [tracked]);
  }
  #_selectedTabIndex = (i(this, "_selectedTabIndex"), undefined);
  static {
    g(this.prototype, "_selectedTabId", [tracked]);
  }
  #_selectedTabId = (i(this, "_selectedTabId"), undefined);
  static {
    g(this.prototype, "_isControlled", [tracked]);
  }
  #_isControlled = (i(this, "_isControlled"), undefined);
  /**
   * Sets the size of Tabs
   * Accepted values: medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size() {
    const {
      size = DEFAULT_SIZE
    } = this.args;
    assert(`@size for "Hds::Tabs" must be one of the following: ${SIZES.join(', ')}; received: ${size}`, SIZES.includes(size));
    return size;
  }
  constructor(owner, args) {
    super(owner, args);

    // this is to determine if the "selected" tab logic is controlled in the consumers' code or is maintained as an internal state
    this._isControlled = this.args.selectedTabIndex !== undefined;
    this._selectedTabIndex = this.args.selectedTabIndex ?? 0;
  }
  get selectedTabIndex() {
    if (this._isControlled) {
      return this.args.selectedTabIndex;
    } else {
      return this._selectedTabIndex;
    }
  }
  set selectedTabIndex(value) {
    if (this._isControlled) ; else {
      this._selectedTabIndex = value;
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-tabs'];

    // add a class based on the @size argument
    classes.push(`hds-tabs--size-${this.size}`);
    return classes.join(' ');
  }
  didInsert() {
    assert('The number of Tabs must be equal to the number of Panels', this._tabNodes.length === this._panelNodes.length);
    if (this._selectedTabId) {
      this.selectedTabIndex = this._tabIds.indexOf(this._selectedTabId);
    }

    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', () => {
      this.setTabIndicator();
    });
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
  didUpdateSelectedTabIndex() {
    // eslint-disable-next-line ember/no-runloop
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
    if (this._selectedTabId) {
      this.selectedTabIndex = this._tabIds.indexOf(this._selectedTabId);
    }
  }
  static {
    n(this.prototype, "didUpdateSelectedTabId", [action]);
  }
  didUpdateParentVisibility() {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', () => {
      this.setTabIndicator();
    });
  }
  static {
    n(this.prototype, "didUpdateParentVisibility", [action]);
  }
  didInsertTab(element, isSelected) {
    this._tabNodes = [...this._tabNodes, element];
    this._tabIds = [...this._tabIds, element.id];
    if (isSelected) {
      this._selectedTabId = element.id;
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
    this._tabNodes = this._tabNodes.filter(node => node.id !== element.id);
    this._tabIds = this._tabIds.filter(tabId => tabId !== element.id);
  }
  static {
    n(this.prototype, "willDestroyTab", [action]);
  }
  didInsertPanel(element, panelId) {
    this._panelNodes = [...this._panelNodes, element];
    this._panelIds = [...this._panelIds, panelId];
  }
  static {
    n(this.prototype, "didInsertPanel", [action]);
  }
  willDestroyPanel(element) {
    this._panelNodes = this._panelNodes.filter(node => node.id !== element.id);
    this._panelIds = this._panelIds.filter(panelId => panelId !== element.id);
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
    const leftArrow = 'ArrowLeft';
    const rightArrow = 'ArrowRight';
    const enterKey = 'Enter';
    const spaceKey = ' ';
    if (event.key === rightArrow) {
      const nextTabIndex = (tabIndex + 1) % this._tabIds.length;
      this.focusTab(nextTabIndex, event);
    } else if (event.key === leftArrow) {
      const prevTabIndex = (tabIndex + this._tabIds.length - 1) % this._tabIds.length;
      this.focusTab(prevTabIndex, event);
    } else if (event.key === enterKey || event.key === spaceKey) {
      this.selectedTabIndex = tabIndex;
    }
    // scroll selected tab into view (it may be out of view when activated using a keyboard with `prev/next`)
    const parentNode = this._tabNodes[this.selectedTabIndex]?.parentNode;
    if (parentNode instanceof HTMLElement) {
      parentNode.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }

  // Focus tab for keyboard & mouse navigation:
  static {
    n(this.prototype, "onKeyUp", [action]);
  }
  focusTab(tabIndex, event) {
    event.preventDefault();
    this._tabNodes[tabIndex]?.focus();
  }
  setTabIndicator() {
    // eslint-disable-next-line ember/no-runloop
    next(() => {
      const tabElem = this._tabNodes[this.selectedTabIndex];
      if (tabElem != null) {
        const tabElemParentNode = tabElem.parentNode;
        const tabsElemClosestList = tabElem.closest('.hds-tabs__tablist');

        // this condition is `null` if any of the parents has `display: none`
        if (tabElemParentNode.offsetParent) {
          const tabLeftPos = tabElemParentNode.offsetLeft;
          const tabWidth = tabElemParentNode.offsetWidth;

          // Set CSS custom properties for indicator
          tabsElemClosestList.style.setProperty('--indicator-left-pos', tabLeftPos + 'px');
          tabsElemClosestList.style.setProperty('--indicator-width', tabWidth + 'px');
        }
      } else {
        let message = '';
        message += '"Hds::Tabs" has tried to set the indicator for an element that doesn\'t exist';
        if (this._tabNodes.length === 0) {
          message += ' (the array `this._tabNodes` is empty, there are no tabs, probably already destroyed)';
        } else {
          message += ` (the value ${this.selectedTabIndex} of \`this.selectedTabIndex\` is out of bound for the array \`this._tabNodes\`, whose index range is [0 - ${this._tabNodes.length - 1}])`;
        }
        // https://api.emberjs.com/ember/5.3/classes/@ember%2Fdebug/methods/warn?anchor=warn
        warn(message, true, {
          id: 'hds-debug.tabs.setTabIndicator-tabElem-not-available'
        });
      }
    });
  }
}
setComponentTemplate(TEMPLATE, HdsTabs);

export { DEFAULT_SIZE, SIZES, HdsTabs as default };
//# sourceMappingURL=index.js.map
