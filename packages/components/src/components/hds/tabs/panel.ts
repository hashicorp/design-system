/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import type { HdsTabsTabSignature } from './tab';
import type { HdsTabsPanelIds, HdsTabsTabIds } from './types';

export interface HdsTabsPanelSignature {
  Args: {
    tabIds: HdsTabsTabIds;
    panelIds: HdsTabsPanelIds;
    selectedTabIndex: HdsTabsTabSignature['Args']['selectedTabIndex'];
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

  elementId?: string;

  get nodeIndex(): number | undefined {
    return this.args.panelIds
      ? this.args.panelIds.indexOf(this.panelId)
      : undefined;
  }

  /**
   * Check the condition if the panel is visible (because the coupled/associated tab is selected) or not
   * @returns {boolean}
   */
  get isVisible(): boolean {
    return this.nodeIndex === this.args.selectedTabIndex;
  }

  /**
   * Get the ID of the tab coupled/associated with the panel (it's used by the `aria-labelledby` attribute)
   * @returns string}
   */
  get coupledTabId(): string | undefined {
    return this.nodeIndex !== undefined
      ? this.args.tabIds[this.nodeIndex]
      : undefined;
  }

  @action
  didInsertNode(element: HTMLElement): void {
    const { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function') {
      this.elementId = element.id;
      didInsertNode(element, this.elementId);
    }
  }

  @action
  willDestroyNode(element: HTMLElement): void {
    const { willDestroyNode } = this.args;

    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  }
}
