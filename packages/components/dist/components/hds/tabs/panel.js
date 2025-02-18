import { _ as _applyDecoratedDescriptor, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-C_TsMG3M.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<section\n  class=\"hds-tabs__panel\"\n  ...attributes\n  role=\"tabpanel\"\n  id={{this._panelId}}\n  hidden={{not this.isVisible}}\n  aria-labelledby={{this.coupledTabId}}\n  {{did-insert this.didInsertNode}}\n  {{will-destroy this.willDestroyNode}}\n>\n  {{yield (hash isVisible=this.isVisible)}}\n</section>");

var _class;
let HdsTabsPanel = (_class = class HdsTabsPanel extends Component {
  constructor(...args) {
    super(...args);
    /**
     * Generate a unique ID for the Panel
     * @return {string}
     * @param _panelId
     */
    _defineProperty(this, "_panelId", 'panel-' + guidFor(this));
    _defineProperty(this, "_elementId", undefined);
  }
  get nodeIndex() {
    return this.args.panelIds ? this.args.panelIds.indexOf(this._panelId) : undefined;
  }

  /**
   * Check the condition if the panel is visible (because the coupled/associated tab is selected) or not
   * @returns {boolean}
   */
  get isVisible() {
    return this.nodeIndex === this.args.selectedTabIndex;
  }

  /**
   * Get the ID of the tab coupled/associated with the panel (it's used by the `aria-labelledby` attribute)
   * @returns string}
   */
  get coupledTabId() {
    return this.nodeIndex !== undefined ? this.args.tabIds?.[this.nodeIndex] : undefined;
  }
  didInsertNode(element) {
    const {
      didInsertNode
    } = this.args;
    if (typeof didInsertNode === 'function') {
      this._elementId = element.id;
      didInsertNode(element, this._elementId);
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
}, _applyDecoratedDescriptor(_class.prototype, "didInsertNode", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsertNode"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "willDestroyNode", [action], Object.getOwnPropertyDescriptor(_class.prototype, "willDestroyNode"), _class.prototype), _class);
setComponentTemplate(TEMPLATE, HdsTabsPanel);

export { HdsTabsPanel as default };
//# sourceMappingURL=panel.js.map
