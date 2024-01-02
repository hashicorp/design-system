/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export default class HdsTabsPanelComponent extends Component {
  /**
   * Generate a unique ID for the Panel
   * @return {string}
   */
  panelId = 'panel-' + guidFor(this);

  @cached
  get nodeIndex() {
    return this.args.panelIds
      ? this.args.panelIds.indexOf(this.panelId)
      : undefined;
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
    return this.nodeIndex !== undefined
      ? this.args.tabIds[this.nodeIndex]
      : undefined;
  }

  @action
  didInsertNode(element) {
    let { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function') {
      this.elementId = element.id;
      didInsertNode(element, this.elementId);
    }
  }

  @action
  willDestroyNode(element) {
    let { willDestroyNode } = this.args;

    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  }
}
