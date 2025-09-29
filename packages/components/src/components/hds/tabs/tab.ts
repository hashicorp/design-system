/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { schedule } from '@ember/runloop';

import type { IconName } from '@hashicorp/flight-icons/svg';
import type { HdsTabsTabIds, HdsTabsPanelIds } from './types';

export interface HdsTabsTabSignature {
  Args: {
    tabIds?: HdsTabsTabIds;
    panelIds?: HdsTabsPanelIds;
    selectedTabIndex?: number;
    icon?: IconName;
    count?: string;
    isSelected?: boolean;
    didInsertNode?: (element: HTMLButtonElement, isSelected?: boolean) => void;
    didUpdateNode?: (nodeIndex: number, isSelected?: boolean) => void;
    willDestroyNode?: (element: HTMLButtonElement) => void;
    onClick?: (event: MouseEvent, tabIndex: number) => void;
    onKeyUp?: (nodeIndex: number, event: KeyboardEvent) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

export default class HdsTabsTab extends Component<HdsTabsTabSignature> {
  /**
   * Generate a unique ID for the Tab
   * @return {string}
   * @param _tabId
   */
  private _tabId = 'tab-' + guidFor(this);

  get nodeIndex(): number | undefined {
    return this.args.tabIds?.indexOf(this._tabId);
  }

  /**
   * Determine if the tab is the selected tab
   * @return {boolean}
   * @default false (1st tab is selected by default)
   */
  get isSelected(): boolean {
    return (
      this.nodeIndex !== undefined &&
      this.nodeIndex === this.args.selectedTabIndex
    );
  }

  /**
   * Get the ID of the panel coupled/associated with the tab (it's used by the `aria-controls` attribute)
   * @returns string}
   */
  get coupledPanelId(): string | undefined {
    return this.nodeIndex !== undefined
      ? this.args.panelIds?.[this.nodeIndex]
      : undefined;
  }

  private _handleInsert = modifier((element: HTMLButtonElement) => {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', () => {
      const { isSelected, didInsertNode } = this.args;

      if (typeof didInsertNode === 'function') {
        didInsertNode(element, isSelected);
      }
    });
  });

  @action
  didUpdateNode(): void {
    const { didUpdateNode } = this.args;

    if (typeof didUpdateNode === 'function' && this.nodeIndex !== undefined) {
      didUpdateNode(this.nodeIndex, this.args.isSelected);
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
  onClick(event: MouseEvent): false | undefined {
    const { onClick } = this.args;

    if (typeof onClick === 'function' && this.nodeIndex !== undefined) {
      onClick(event, this.nodeIndex);
    } else {
      return false;
    }
  }

  @action
  onKeyUp(event: KeyboardEvent): void {
    const { onKeyUp } = this.args;

    if (typeof onKeyUp === 'function' && this.nodeIndex !== undefined) {
      onKeyUp(this.nodeIndex, event);
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-tabs__tab'];

    if (this.isSelected) {
      classes.push(`hds-tabs__tab--is-selected`);
    }

    return classes.join(' ');
  }
}
