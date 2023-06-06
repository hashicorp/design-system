/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

const NOOP = () => {};

export default class HdsBreadcrumbComponent extends Component {
  /**
   * @param onDidInsert
   * @type {function}
   * @default () => {}
   */
  get didInsert() {
    let { didInsert } = this.args;

    if (typeof didInsert === 'function') {
      return didInsert;
    } else {
      return NOOP;
    }
  }

  /**
   * @param itemsCanWrap
   * @type {boolean}
   * @default true
   */
  get itemsCanWrap() {
    return this.args.itemsCanWrap ?? true;
  }

  /**
   * @param ariaLabel
   * @type {string}
   * @default 'breadcrumbs'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'breadcrumbs';
  }

  /**
   * Get the class names to apply to the component.
   * @method Breadcrumb#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-breadcrumb'];

    // add a class based on the @itemsCanWrap argument
    if (this.itemsCanWrap) {
      classes.push('hds-breadcrumb--items-can-wrap');
    }

    return classes.join(' ');
  }
}
