import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { HdsAdvancedTableThExpandIconValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! template-lint-disable no-unsupported-role-attributes }}\n{{! ember template lint doesnt support ARIA 1.3 yet, including aria-description - https://github.com/A11yance/aria-query/pull/557 }}\n<button\n  type=\"button\"\n  class={{this.classNames}}\n  {{on \"click\" this.onClick}}\n  aria-labelledby=\"{{this._prefixLabelId}} {{@labelId}}\"\n  aria-expanded=\"{{this.isExpanded}}\"\n  aria-description=\"Toggle the visibility of the related rows.\"\n  ...attributes\n>\n  {{! template-lint-enable no-unsupported-role-attributes}}\n  <span id={{this._prefixLabelId}} class=\"hds-advanced-table__th-button-aria-label-hidden-segment\">Toggle</span>\n  <Hds::Icon @name={{this.icon}} />\n</button>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAdvancedTableThButtonExpand extends Component {
  // Generates a unique ID for the (hidden) "label prefix" <span> element
  _prefixLabelId = 'prefix-' + guidFor(this);
  get isExpanded() {
    const {
      isExpanded = false
    } = this.args;
    return isExpanded;
  }
  get icon() {
    if (this.isExpanded) {
      return HdsAdvancedTableThExpandIconValues.ChevronDown;
    } else {
      return HdsAdvancedTableThExpandIconValues.ChevronRight;
    }
  }
  onClick() {
    if (this.args.onToggle) {
      this.args.onToggle();
    }
  }
  static {
    n(this.prototype, "onClick", [action]);
  }
  get classNames() {
    const classes = ['hds-advanced-table__th-button', 'hds-advanced-table__th-button--expand'];

    // add a class based on the isExpanded state
    if (this.args.isExpanded) {
      classes.push(`hds-advanced-table__th-button--is-expanded`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsAdvancedTableThButtonExpand);

export { HdsAdvancedTableThButtonExpand as default };
//# sourceMappingURL=th-button-expand.js.map
