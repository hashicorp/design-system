import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { HdsAdvancedTableThSortOrderIconValues, HdsAdvancedTableThSortOrderValues, HdsAdvancedTableThSortOrderLabelValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<button\n  type=\"button\"\n  class={{this.classNames}}\n  {{on \"click\" this.onClick}}\n  aria-labelledby=\"{{this._prefixLabelId}} {{@labelId}} {{this._suffixLabelId}}\"\n  ...attributes\n>\n  <span id={{this._prefixLabelId}} class=\"hds-advanced-table__th-button-aria-label-hidden-segment\">Sort by</span>\n  <span\n    id={{this._suffixLabelId}}\n    class=\"hds-advanced-table__th-button-aria-label-hidden-segment\"\n  >{{this.sortOrderLabel}}</span>\n  <Hds::Icon @name={{this.icon}} />\n</button>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const NOOP = () => {};
class HdsAdvancedTableThButtonSort extends Component {
  // Generates a unique ID for the (hidden) "label prefix/suffix" <span> elements
  _prefixLabelId = 'prefix-' + guidFor(this);
  _suffixLabelId = 'suffix-' + guidFor(this);
  get icon() {
    switch (this.args.sortOrder) {
      case HdsAdvancedTableThSortOrderValues.Asc:
        return HdsAdvancedTableThSortOrderIconValues.ArrowUp;
      case HdsAdvancedTableThSortOrderValues.Desc:
        return HdsAdvancedTableThSortOrderIconValues.ArrowDown;
      default:
        return HdsAdvancedTableThSortOrderIconValues.SwapVertical;
    }
  }

  // Determines the label (suffix) to use in the `aria-labelledby` attribute of the button,
  // used to indicate what will happen if the user clicks on the button
  get sortOrderLabel() {
    return this.args.sortOrder === HdsAdvancedTableThSortOrderValues.Asc ? HdsAdvancedTableThSortOrderLabelValues.Desc : HdsAdvancedTableThSortOrderLabelValues.Asc;
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
    const classes = ['hds-advanced-table__th-button', 'hds-advanced-table__th-button--sort'];

    // add a class based on the @sortOrder argument
    if (this.args.sortOrder === HdsAdvancedTableThSortOrderValues.Asc || this.args.sortOrder === HdsAdvancedTableThSortOrderValues.Desc) {
      classes.push(`hds-advanced-table__th-button--is-sorted`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsAdvancedTableThButtonSort);

export { HdsAdvancedTableThButtonSort as default };
//# sourceMappingURL=th-button-sort.js.map
