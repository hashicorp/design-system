/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export default class HdsTabsIndexComponent extends Component {
  /**
   * Generate a unique ID for the Tab
   * @return {string}
   */
  tabId = 'tab-' + guidFor(this);

  @cached
  get nodeIndex() {
    return this.args.tabIds ? this.args.tabIds.indexOf(this.tabId) : undefined;
  }

  /**
   * Determine if the tab is the selected tab
   * @return {boolean}
   * @default false (1st tab is selected by default)
   */
  get isSelected() {
    return (
      this.nodeIndex !== undefined &&
      this.nodeIndex === this.args.selectedTabIndex
    );
  }

  @action
  didInsertNode(element, positional) {
    let { didInsertNode } = this.args;

    const isSelected = positional[0];

    if (typeof didInsertNode === 'function') {
      didInsertNode(element, isSelected);
    }
  }

  @action
  didUpdateNode() {
    let { didUpdateNode } = this.args;

    if (typeof didUpdateNode === 'function') {
      didUpdateNode(this.nodeIndex, this.args.isSelected);
    }
  }

  @action
  willDestroyNode(element) {
    let { willDestroyNode } = this.args;

    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  }

  @action
  onClick(event) {
    let { onClick } = this.args;

    if (typeof onClick === 'function') {
      onClick(event, this.nodeIndex);
    } else {
      return false;
    }
  }

  @action
  onKeyUp(event) {
    let { onKeyUp } = this.args;

    if (typeof onKeyUp === 'function') {
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
    let classes = ['hds-tabs__tab'];

    if (this.isSelected) {
      classes.push(`hds-tabs__tab--is-selected`);
    }

    return classes.join(' ');
  }
}
