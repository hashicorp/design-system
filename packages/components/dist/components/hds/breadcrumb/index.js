import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<nav class={{this.classNames}} aria-label={{this.ariaLabel}} ...attributes>\n  <ol class=\"hds-breadcrumb__list\" {{did-insert this.didInsert}}>\n    {{yield}}\n  </ol>\n</nav>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const NOOP = () => {};
class HdsBreadcrumbComponent extends Component {
  /**
   * @param onDidInsert
   * @type {function}
   * @default () => {}
   */
  get didInsert() {
    let {
      didInsert
    } = this.args;
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
setComponentTemplate(TEMPLATE, HdsBreadcrumbComponent);

export { HdsBreadcrumbComponent as default };
//# sourceMappingURL=index.js.map
