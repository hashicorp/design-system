/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export interface HdsTabsTabSignature {
  Args: {
    selectedTabIndex: number;
    tabIds: string[];
    count?: string;
    icon?: string;
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

  get nodeIndex() {
    return this.args.tabIds.indexOf(this.tabId);
  }

  /**
   * Determine if the tab is the selected tab
   * @return {boolean}
   * @default false (1st tab is selected by default)
   */
  get isSelected() {
    return this.nodeIndex === this.args.selectedTabIndex;
  }

  @action
  didInsertNode(element: HTMLButtonElement, positional: [boolean?]) {
    const isSelected = positional[0];
    this.args.didInsertNode(element, isSelected);
  }

  @action
  didUpdateNode() {
    this.args.didUpdateNode(this.nodeIndex, this.args.isSelected);
  }

  @action
  onKeyUp(event: KeyboardEvent) {
    this.args.onKeyUp(this.nodeIndex, event);
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
