/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export interface HdsTabsPanelSignature {
  Args: {
    tabIds: string[];
    panelIds: string[];
    selectedTabIndex: number;
    didInsertNode: (element: HTMLElement, elementId: string) => void;
    willDestroyNode: (element: HTMLElement) => void;
  };
  Blocks: {
    default: [
      {
        isVisible: boolean;
      }
    ];
  };
  Element: HTMLElement;
}

export default class HdsTabsPanelComponent extends Component<HdsTabsPanelSignature> {
  /**
   * Generate a unique ID for the Panel
   * @return {string}
   */
  panelId = 'panel-' + guidFor(this);

  @tracked elementId: string | null = null;

  get nodeIndex() {
    return this.args.panelIds.indexOf(this.panelId);
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
    return this.args.tabIds[this.nodeIndex];
  }

  @action
  didInsertNode(element: HTMLElement) {
    this.elementId = element.id;
    this.args.didInsertNode(element, this.elementId);
  }
}
