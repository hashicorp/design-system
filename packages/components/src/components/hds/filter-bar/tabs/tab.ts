/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';

export interface HdsFilterBarTabsTabSignature {
  Args: {
    selectedTabIndex?: number;
    tabIds?: string[];
    panelIds?: string[];
    numFilters?: number;
    didInsertNode?: () => void;
    willDestroyNode?: (element: HTMLButtonElement) => void;
    onClick?: (event: MouseEvent, nodeIndex: number) => void;
    onKeyUp?: (event: KeyboardEvent, nodeIndex: number) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class HdsFilterBarTabsTab extends Component<HdsFilterBarTabsTabSignature> {
  private _tabId = 'tab-' + guidFor(this);

  private _setUpTab = modifier(
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
    return this.args.tabIds?.indexOf(this._tabId);
  }

  get coupledPanelId(): string | undefined {
    return this.nodeIndex !== undefined
      ? this.args.panelIds?.[this.nodeIndex]
      : undefined;
  }

  get isSelected(): boolean {
    return (
      this.nodeIndex !== undefined &&
      this.nodeIndex === this.args.selectedTabIndex
    );
  }

  @action
  didInsertNode(): void {
    const { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function') {
      didInsertNode();
    }
  }

  @action
  willDestroyNode(element: HTMLButtonElement): void {
    const { willDestroyNode } = this.args;

    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  }

  @action
  onClick(event: MouseEvent): void {
    const { onClick } = this.args;

    if (this.nodeIndex !== undefined && typeof onClick === 'function') {
      onClick(event, this.nodeIndex);
    }
  }

  @action
  onKeyUp(event: KeyboardEvent): void {
    const { onKeyUp } = this.args;

    if (this.nodeIndex !== undefined && typeof onKeyUp === 'function') {
      onKeyUp(event, this.nodeIndex);
    }
  }

  get classNames(): string {
    const classes = ['hds-filter-bar__tabs__tab'];

    if (this.isSelected) {
      classes.push(`hds-filter-bar__tabs__tab--is-selected`);
    }

    return classes.join(' ');
  }
}
