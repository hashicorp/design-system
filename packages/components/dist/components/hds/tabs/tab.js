import { _ as _applyDecoratedDescriptor, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! template-lint-disable require-context-role no-invalid-role }}\n<li class={{this.classNames}} ...attributes role=\"presentation\">\n  <button\n    class=\"hds-tabs__tab-button\"\n    role=\"tab\"\n    type=\"button\"\n    id={{this.tabId}}\n    aria-selected={{if this.isSelected \"true\" \"false\"}}\n    tabindex={{unless this.isSelected \"-1\"}}\n    {{did-insert this.didInsertNode @isSelected}}\n    {{did-update this.didUpdateNode @count @isSelected}}\n    {{will-destroy this.willDestroyNode}}\n    {{on \"click\" this.onClick}}\n    {{on \"keyup\" this.onKeyUp}}\n  >\n    {{#if @icon}}\n      <FlightIcon @name={{@icon}} class=\"hds-tabs__tab-icon\" role=\"presentation\" />\n    {{/if}}\n\n    {{yield}}\n\n    {{#if @count}}\n      <Hds::BadgeCount @text={{@count}} @size=\"small\" class=\"hds-tabs__tab-count\" role=\"presentation\" />\n    {{/if}}\n  </button>\n</li>\n{{! template-lint-enable require-context-role no-invalid-role }}");

var _class;
let HdsTabsTabComponent = (_class = class HdsTabsTabComponent extends Component {
  constructor(...args) {
    super(...args);
    /**
     * Generate a unique ID for the Tab
     * @return {string}
     */
    _defineProperty(this, "tabId", 'tab-' + guidFor(this));
  }
  get nodeIndex() {
    return this.args.tabIds?.indexOf(this.tabId);
  }

  /**
   * Determine if the tab is the selected tab
   * @return {boolean}
   * @default false (1st tab is selected by default)
   */
  get isSelected() {
    return this.nodeIndex !== undefined && this.nodeIndex === this.args.selectedTabIndex;
  }
  didInsertNode(element, positional) {
    const {
      didInsertNode
    } = this.args;
    const isSelected = positional[0];
    if (typeof didInsertNode === 'function') {
      didInsertNode(element, isSelected);
    }
  }
  didUpdateNode() {
    const {
      didUpdateNode
    } = this.args;
    if (typeof didUpdateNode === 'function' && this.nodeIndex !== undefined) {
      didUpdateNode(this.nodeIndex, this.args.isSelected);
    }
  }
  willDestroyNode(element) {
    const {
      willDestroyNode
    } = this.args;
    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  }
  onClick(event) {
    const {
      onClick
    } = this.args;
    if (typeof onClick === 'function' && this.nodeIndex !== undefined) {
      onClick(event, this.nodeIndex);
    } else {
      return false;
    }
  }
  onKeyUp(event) {
    const {
      onKeyUp
    } = this.args;
    if (typeof onKeyUp === 'function' && this.nodeIndex !== undefined) {
      onKeyUp(this.nodeIndex, event);
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-tabs__tab'];
    if (this.isSelected) {
      classes.push(`hds-tabs__tab--is-selected`);
    }
    return classes.join(' ');
  }
}, (_applyDecoratedDescriptor(_class.prototype, "didInsertNode", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsertNode"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didUpdateNode", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didUpdateNode"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "willDestroyNode", [action], Object.getOwnPropertyDescriptor(_class.prototype, "willDestroyNode"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onClick", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClick"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onKeyUp", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onKeyUp"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsTabsTabComponent);

export { HdsTabsTabComponent as default };
//# sourceMappingURL=tab.js.map
