/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import type { IconName } from '@hashicorp/flight-icons/svg';
import type { HdsTabsTabIds } from './types';

export interface HdsTabsTabSignature {
  Args: {
    tabIds: HdsTabsTabIds;
    selectedTabIndex: number;
    icon?: IconName;
    count?: string;
    isSelected?: boolean;
    didInsertNode: (element: HTMLButtonElement, isSelected?: boolean) => void;
    didUpdateNode: (nodeIndex: number, isSelected?: boolean) => void;
    willDestroyNode: (element: HTMLButtonElement) => void;
    onClick: (event: MouseEvent, tabIndex: number) => void;
    onKeyUp: (nodeIndex: number, event: KeyboardEvent) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

export default class HdsTabsTabComponent extends Component<HdsTabsTabSignature> {
  /**
   * Generate a unique ID for the Tab
   * @return {string}
   */
  tabId = 'tab-' + guidFor(this);

  get nodeIndex(): number | undefined {
    return this.args.tabIds?.indexOf(this.tabId);
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

  @action
  didInsertNode(element: HTMLButtonElement, positional: [boolean?]) {
    const { didInsertNode } = this.args;

    const isSelected = positional[0];

    if (typeof didInsertNode === 'function') {
      didInsertNode(element, isSelected);
    }
  }

  @action
  didUpdateNode() {
    const { didUpdateNode } = this.args;

    if (typeof didUpdateNode === 'function' && this.nodeIndex !== undefined) {
      didUpdateNode(this.nodeIndex, this.args.isSelected);
    }
  }

  @action
  willDestroyNode(element: HTMLButtonElement) {
    const { willDestroyNode } = this.args;

    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  }

  @action
  onClick(event: MouseEvent) {
    const { onClick } = this.args;

    if (typeof onClick === 'function' && this.nodeIndex !== undefined) {
      onClick(event, this.nodeIndex);
    } else {
      return false;
    }
  }

  @action
  onKeyUp(event: KeyboardEvent) {
    const { onKeyUp } = this.args;

    if (typeof onKeyUp === 'function' && this.nodeIndex !== undefined) {
      onKeyUp(this.nodeIndex, event);
    } else {
      return false;
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-tabs__tab'];

    if (this.isSelected) {
      classes.push(`hds-tabs__tab--is-selected`);
    }

    return classes.join(' ');
  }
}
