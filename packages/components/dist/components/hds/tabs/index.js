import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../_rollupPluginBabelHelpers-DSLVWx63.js';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert, warn } from '@ember/debug';
import { schedule, next } from '@ember/runloop';
import { HdsTabsSizeValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! template-lint-disable no-invalid-role }}\n<div\n  class={{this.classNames}}\n  {{did-insert this.didInsert}}\n  {{did-update this.didUpdateSelectedTabIndex this.selectedTabIndex}}\n  {{did-update this.didUpdateSelectedTabId this._selectedTabId}}\n  {{did-update this.didUpdateParentVisibility @isParentVisible}}\n  ...attributes\n>\n  <div class=\"hds-tabs__tablist-wrapper\">\n    <ul class=\"hds-tabs__tablist\" role=\"tablist\">\n      {{yield\n        (hash\n          Tab=(component\n            \"hds/tabs/tab\"\n            didInsertNode=this.didInsertTab\n            didUpdateNode=this.didUpdateTab\n            willDestroyNode=this.willDestroyTab\n            tabIds=this._tabIds\n            selectedTabIndex=this.selectedTabIndex\n            onClick=this.onClick\n            onKeyUp=this.onKeyUp\n          )\n        )\n      }}\n      <li class=\"hds-tabs__tab-indicator\" role=\"presentation\"></li>\n    </ul>\n  </div>\n\n  {{yield\n    (hash\n      Panel=(component\n        \"hds/tabs/panel\"\n        didInsertNode=this.didInsertPanel\n        willDestroyNode=this.willDestroyPanel\n        tabIds=this._tabIds\n        panelIds=this._panelIds\n        selectedTabIndex=this.selectedTabIndex\n      )\n    )\n  }}\n</div>\n{{! template-lint-enable no-invalid-role }}");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
const DEFAULT_SIZE = 'medium';
const SIZES = Object.values(HdsTabsSizeValues);
let HdsTabs = (_class = class HdsTabs extends Component {
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
    _initializerDefineProperty(this, "_tabNodes", _descriptor, this);
    _initializerDefineProperty(this, "_tabIds", _descriptor2, this);
    _initializerDefineProperty(this, "_panelNodes", _descriptor3, this);
    _initializerDefineProperty(this, "_panelIds", _descriptor4, this);
    _initializerDefineProperty(this, "_selectedTabIndex", _descriptor5, this);
    _initializerDefineProperty(this, "_selectedTabId", _descriptor6, this);
    _initializerDefineProperty(this, "_isControlled", _descriptor7, this);
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
  didUpdateSelectedTabIndex() {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', () => {
      this.setTabIndicator();
    });
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
  didUpdateParentVisibility() {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', () => {
      this.setTabIndicator();
    });
  }
  didInsertTab(element, isSelected) {
    this._tabNodes = [...this._tabNodes, element];
    this._tabIds = [...this._tabIds, element.id];
    if (isSelected) {
      this._selectedTabId = element.id;
    }
  }
  didUpdateTab(tabIndex, isSelected) {
    if (isSelected) {
      this.selectedTabIndex = tabIndex;
    }
    this.setTabIndicator();
  }
  willDestroyTab(element) {
    this._tabNodes = this._tabNodes.filter(node => node.id !== element.id);
    this._tabIds = this._tabIds.filter(tabId => tabId !== element.id);
  }
  didInsertPanel(element, panelId) {
    this._panelNodes = [...this._panelNodes, element];
    this._panelIds = [...this._panelIds, panelId];
  }
  willDestroyPanel(element) {
    this._panelNodes = this._panelNodes.filter(node => node.id !== element.id);
    this._panelIds = this._panelIds.filter(panelId => panelId !== element.id);
  }
  onClick(event, tabIndex) {
    this.selectedTabIndex = tabIndex;
    this.setTabIndicator();

    // invoke the callback function if it's provided as argument
    if (typeof this.args.onClickTab === 'function') {
      this.args.onClickTab(event, tabIndex);
    }
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
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "_tabNodes", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "_tabIds", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "_panelNodes", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "_panelIds", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "_selectedTabIndex", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "_selectedTabId", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "_isControlled", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "didInsert", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsert"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didUpdateSelectedTabIndex", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didUpdateSelectedTabIndex"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didUpdateSelectedTabId", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didUpdateSelectedTabId"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didUpdateParentVisibility", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didUpdateParentVisibility"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didInsertTab", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsertTab"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didUpdateTab", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didUpdateTab"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "willDestroyTab", [action], Object.getOwnPropertyDescriptor(_class.prototype, "willDestroyTab"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didInsertPanel", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsertPanel"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "willDestroyPanel", [action], Object.getOwnPropertyDescriptor(_class.prototype, "willDestroyPanel"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onClick", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClick"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onKeyUp", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onKeyUp"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsTabs);

export { DEFAULT_SIZE, SIZES, HdsTabs as default };
//# sourceMappingURL=index.js.map
