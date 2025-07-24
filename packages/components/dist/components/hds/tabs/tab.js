import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! template-lint-disable require-context-role no-invalid-role }}\n<li class={{this.classNames}} ...attributes role=\"presentation\">\n  <button\n    class=\"hds-tabs__tab-button\"\n    role=\"tab\"\n    type=\"button\"\n    id={{this._tabId}}\n    aria-controls={{this.coupledPanelId}}\n    aria-selected={{if this.isSelected \"true\" \"false\"}}\n    tabindex={{unless this.isSelected \"-1\"}}\n    {{did-insert this.didInsertNode @isSelected}}\n    {{did-update this.didUpdateNode @count @isSelected}}\n    {{will-destroy this.willDestroyNode}}\n    {{on \"click\" this.onClick}}\n    {{on \"keyup\" this.onKeyUp}}\n  >\n    {{#if @icon}}\n      <Hds::Icon @name={{@icon}} class=\"hds-tabs__tab-icon\" role=\"presentation\" />\n    {{/if}}\n\n    {{yield}}\n\n    {{#if @count}}\n      <Hds::BadgeCount @text={{@count}} @size=\"small\" class=\"hds-tabs__tab-count\" role=\"presentation\" />\n    {{/if}}\n  </button>\n</li>\n{{! template-lint-enable require-context-role no-invalid-role }}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsTabsTab extends Component {
  /**
   * Generate a unique ID for the Tab
   * @return {string}
   * @param _tabId
   */
  _tabId = 'tab-' + guidFor(this);
  get nodeIndex() {
    return this.args.tabIds?.indexOf(this._tabId);
  }

  /**
   * Determine if the tab is the selected tab
   * @return {boolean}
   * @default false (1st tab is selected by default)
   */
  get isSelected() {
    return this.nodeIndex !== undefined && this.nodeIndex === this.args.selectedTabIndex;
  }

  /**
   * Get the ID of the panel coupled/associated with the tab (it's used by the `aria-controls` attribute)
   * @returns string}
   */
  get coupledPanelId() {
    return this.nodeIndex !== undefined ? this.args.panelIds?.[this.nodeIndex] : undefined;
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
  static {
    n(this.prototype, "didInsertNode", [action]);
  }
  didUpdateNode() {
    const {
      didUpdateNode
    } = this.args;
    if (typeof didUpdateNode === 'function' && this.nodeIndex !== undefined) {
      didUpdateNode(this.nodeIndex, this.args.isSelected);
    }
  }
  static {
    n(this.prototype, "didUpdateNode", [action]);
  }
  willDestroyNode(element) {
    const {
      willDestroyNode
    } = this.args;
    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  }
  static {
    n(this.prototype, "willDestroyNode", [action]);
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
  static {
    n(this.prototype, "onClick", [action]);
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
  static {
    n(this.prototype, "onKeyUp", [action]);
  }
  get classNames() {
    const classes = ['hds-tabs__tab'];
    if (this.isSelected) {
      classes.push(`hds-tabs__tab--is-selected`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsTabsTab);

export { HdsTabsTab as default };
//# sourceMappingURL=tab.js.map
