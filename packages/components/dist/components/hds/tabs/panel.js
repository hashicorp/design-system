import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<section\n  class=\"hds-tabs__panel\"\n  ...attributes\n  role=\"tabpanel\"\n  id={{this._panelId}}\n  hidden={{not this.isVisible}}\n  aria-labelledby={{this.coupledTabId}}\n  {{did-insert this.didInsertNode}}\n  {{will-destroy this.willDestroyNode}}\n>\n  {{yield (hash isVisible=this.isVisible)}}\n</section>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsTabsPanel extends Component {
  /**
   * Generate a unique ID for the Panel
   * @return {string}
   * @param _panelId
   */
  _panelId = 'panel-' + guidFor(this);
  _elementId;
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
  static {
    n(this.prototype, "didInsertNode", [action]);
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
}
setComponentTemplate(TEMPLATE, HdsTabsPanel);

export { HdsTabsPanel as default };
//# sourceMappingURL=panel.js.map
