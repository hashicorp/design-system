import { a as _defineProperty } from '../../../_rollupPluginBabelHelpers-81503waH.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { HdsTableThSortOrderIconValues, HdsTableThSortOrderValues, HdsTableThSortOrderLabelValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<button\n  type=\"button\"\n  class={{this.classNames}}\n  {{on \"click\" this.onClick}}\n  aria-labelledby=\"{{this._prefixLabelId}} {{@labelId}} {{this._suffixLabelId}}\"\n  ...attributes\n>\n  <span id={{this._prefixLabelId}} class=\"hds-table__th-button-aria-label-hidden-segment\">Sort by</span>\n  <span id={{this._suffixLabelId}} class=\"hds-table__th-button-aria-label-hidden-segment\">{{this.sortOrderLabel}}</span>\n  <Hds::Icon @name={{this.icon}} />\n</button>");

const NOOP = () => {};
class HdsTableThButtonSort extends Component {
  constructor(...args) {
    super(...args);
    // Generates a unique ID for the (hidden) "label prefix/suffix" <span> elements
    _defineProperty(this, "_prefixLabelId", 'prefix-' + guidFor(this));
    _defineProperty(this, "_suffixLabelId", 'suffix-' + guidFor(this));
  }
  get icon() {
    switch (this.args.sortOrder) {
      case HdsTableThSortOrderValues.Asc:
        return HdsTableThSortOrderIconValues.ArrowUp;
      case HdsTableThSortOrderValues.Desc:
        return HdsTableThSortOrderIconValues.ArrowDown;
      default:
        return HdsTableThSortOrderIconValues.SwapVertical;
    }
  }

  // Determines the label (suffix) to use in the `aria-labelledby` attribute of the button,
  // used to indicate what will happen if the user clicks on the button
  get sortOrderLabel() {
    return this.args.sortOrder === HdsTableThSortOrderValues.Asc ? HdsTableThSortOrderLabelValues.Desc : HdsTableThSortOrderLabelValues.Asc;
  }
  get onClick() {
    const {
      onClick
    } = this.args;
    if (typeof onClick === 'function') {
      return onClick;
    } else {
      return NOOP;
    }
  }
  get classNames() {
    const classes = ['hds-table__th-button', 'hds-table__th-button--sort'];

    // add a class based on the @sortOrder argument
    if (this.args.sortOrder === HdsTableThSortOrderValues.Asc || this.args.sortOrder === HdsTableThSortOrderValues.Desc) {
      classes.push(`hds-table__th-button--is-sorted`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsTableThButtonSort);

export { HdsTableThButtonSort as default };
//# sourceMappingURL=th-button-sort.js.map
