/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { hash } from '@ember/helper';
import { not } from 'ember-truth-helpers';
import { modifier } from 'ember-modifier';

import { deferAfterRender } from '../../../utils/hds-defer.ts';

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
  private _panelId = 'panel-' + guidFor(this);

  private _elementId?: string;

  get nodeIndex(): number | undefined {
    return this.args.panelIds
      ? this.args.panelIds.indexOf(this._panelId)
      : undefined;
  }

  get isVisible(): boolean {
    return this.nodeIndex === this.args.selectedTabIndex;
  }

  get coupledTabId(): string | undefined {
    return this.nodeIndex !== undefined
      ? this.args.tabIds?.[this.nodeIndex]
      : undefined;
  }

  private _registerPanel = modifier((element: HTMLElement) => {
    const { didInsertNode, willDestroyNode } = this.args;

    // deferred so the parent updates its tracked state outside of rendering
    deferAfterRender((): void => {
      if (typeof didInsertNode === 'function') {
        this._elementId = element.id;
        didInsertNode(element, this._elementId);
      }
    }, this);

    return () => {
      if (typeof willDestroyNode === 'function') {
        willDestroyNode(element);
      }
    };
  });

  <template>
    <section
      class="hds-tabs__panel"
      ...attributes
      role="tabpanel"
      id={{this._panelId}}
      hidden={{not this.isVisible}}
      aria-labelledby={{this.coupledTabId}}
      {{this._registerPanel}}
    >
      {{yield (hash isVisible=this.isVisible)}}
    </section>
  </template>
}
