/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { not } from 'ember-truth-helpers';
import { hash } from '@ember/helper';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';

import type { HdsTabsTabSignature } from './tab.gts';
import type { HdsTabsPanelIds, HdsTabsTabIds } from './types';

export interface HdsTabsPanelSignature {
  Args: {
    tabIds?: HdsTabsTabIds;
    panelIds?: HdsTabsPanelIds;
    selectedTabIndex?: HdsTabsTabSignature['Args']['selectedTabIndex'];
    didInsertNode?: (element: HTMLElement, elementId: string) => void;
    willDestroyNode?: (element: HTMLElement) => void;
  };
  Blocks: {
    default: [
      {
        isVisible?: boolean;
      },
    ];
  };
  Element: HTMLElement;
}

export default class HdsTabsPanel extends Component<HdsTabsPanelSignature> {
  /**
   * Generate a unique ID for the Panel
   * @return {string}
   * @param _panelId
   */
  private _panelId = 'panel-' + guidFor(this);

  private _elementId?: string;

  get nodeIndex(): number | undefined {
    return this.args.panelIds
      ? this.args.panelIds.indexOf(this._panelId)
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
      ? this.args.tabIds?.[this.nodeIndex]
      : undefined;
  }

  @action
  didInsertNode(element: HTMLElement): void {
    const { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function') {
      this._elementId = element.id;
      didInsertNode(element, this._elementId);
    }
  }

  @action
  willDestroyNode(element: HTMLElement): void {
    const { willDestroyNode } = this.args;

    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  }

  <template>
    <section
      class="hds-tabs__panel"
      ...attributes
      role="tabpanel"
      id={{this._panelId}}
      hidden={{not this.isVisible}}
      aria-labelledby={{this.coupledTabId}}
      {{didInsert this.didInsertNode}}
      {{willDestroy this.willDestroyNode}}
    >
      {{yield (hash isVisible=this.isVisible)}}
    </section>
  </template>
}
