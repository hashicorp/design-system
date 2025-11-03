/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';

export interface HdsFilterBarTabsPanelSignature {
  Args: {
    selectedTabIndex?: number;
    tabIds?: string[];
    panelIds?: string[];
    didInsertNode?: () => void;
    willDestroyNode?: (element: HTMLElement) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class HdsFilterBarTabsPanel extends Component<HdsFilterBarTabsPanelSignature> {
  private _panelId = 'panel-' + guidFor(this);
  private _elementId?: string;

  private _setUpPanel = modifier(
    (
      element: HTMLElement,
      [insertCallbackFunction, destroyCallbackFunction]
    ) => {
      if (typeof insertCallbackFunction === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        insertCallbackFunction(element);
      }

      return () => {
        if (typeof destroyCallbackFunction === 'function') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          destroyCallbackFunction(element);
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

  @action
  didInsertNode(element: HTMLElement): void {
    const { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function') {
      this._elementId = element.id;
      didInsertNode();
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
