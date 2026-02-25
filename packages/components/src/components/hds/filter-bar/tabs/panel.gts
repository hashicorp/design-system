/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { modifier, type PositionalArgs } from 'ember-modifier';
import { not } from 'ember-truth-helpers';

export interface HdsFilterBarTabsPanelModifierSignature {
  Args: {
    insertCallbackFunction?: (element: HTMLElement) => void;
    destroyCallbackFunction?: (element: HTMLElement) => void;
  };
  Element: HTMLElement;
}

export interface HdsFilterBarTabsPanelSignature {
  Args: {
    selectedTabIndex?: number;
    tabIds?: string[];
    panelIds?: string[];
    didInsertNode?: (element: HTMLElement, panelId: string) => void;
    willDestroyNode?: (element: HTMLElement) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class HdsFilterBarTabsPanel extends Component<HdsFilterBarTabsPanelSignature> {
  private _panelId = 'panel-' + guidFor(this);

  private _setUpPanel = modifier(
    (
      element: HTMLElement,
      positional: PositionalArgs<HdsFilterBarTabsPanelModifierSignature>,
      named: HdsFilterBarTabsPanelModifierSignature['Args']
    ) => {
      if (typeof named.insertCallbackFunction === 'function') {
        named.insertCallbackFunction(element);
      }

      return () => {
        if (typeof named.destroyCallbackFunction === 'function') {
          named.destroyCallbackFunction(element);
        }
      };
    }
  );

  get nodeIndex(): number | undefined {
    return this.args.panelIds?.indexOf(this._panelId);
  }

  get coupledTabId(): string | undefined {
    return this.nodeIndex !== undefined
      ? this.args.tabIds?.[this.nodeIndex]
      : undefined;
  }

  get isVisible(): boolean {
    return this.nodeIndex === this.args.selectedTabIndex;
  }

  didInsertNode = (element: HTMLElement): void => {
    const { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function') {
      didInsertNode(element, this._panelId);
    }
  };

  willDestroyNode = (element: HTMLElement): void => {
    const { willDestroyNode } = this.args;

    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  };

  <template>
    <section
      class="hds-filter-bar__tabs__panel"
      ...attributes
      role="tabpanel"
      id={{this._panelId}}
      hidden={{not this.isVisible}}
      aria-labelledby={{this.coupledTabId}}
      {{this._setUpPanel
        insertCallbackFunction=this.didInsertNode
        destroyCallbackFunction=this.willDestroyNode
      }}
    >
      {{#if this.isVisible}}
        {{yield}}
      {{/if}}
    </section>
  </template>
}
