import { _ as _applyDecoratedDescriptor, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { HdsAdvancedTableThExpandIconValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<button\n  type=\"button\"\n  class={{this.classNames}}\n  {{on \"click\" this.onClick}}\n  aria-labelledby=\"{{this.prefixLabelId}} {{@labelId}}\"\n  aria-expanded={{@isExpanded}}\n  aria-description=\"Toggle the visibility of the related rows.\"\n  ...attributes\n>\n  <span id={{this.prefixLabelId}} class=\"hds-advanced-table__th-button-aria-label-hidden-segment\">Toggle</span>\n  <Hds::Icon @name={{this.icon}} />\n</button>");

var _class;
let HdsAdvancedTableThButtonExpand = (_class = class HdsAdvancedTableThButtonExpand extends Component {
  constructor(...args) {
    super(...args);
    // @tracked isExpanded = false;
    // Generates a unique ID for the (hidden) "label prefix" <span> element
    _defineProperty(this, "prefixLabelId", 'prefix-' + guidFor(this));
  }
  get icon() {
    if (this.args.isExpanded) {
      return HdsAdvancedTableThExpandIconValues.ChevronDown;
    } else {
      return HdsAdvancedTableThExpandIconValues.ChevronRight;
    }
  }
  onClick() {
    // this.isExpanded = !this.isExpanded;
    if (this.args.onToggle) {
      this.args.onToggle();
    }
  }
  get classNames() {
    const classes = ['hds-advanced-table__th-button', 'hds-advanced-table__th-button--expand'];

    // add a class based on the isExpanded state
    if (this.args.isExpanded) {
      classes.push(`hds-advanced-table__th-button--is-expanded`);
    }
    return classes.join(' ');
  }
}, (_applyDecoratedDescriptor(_class.prototype, "onClick", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClick"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsAdvancedTableThButtonExpand);

export { HdsAdvancedTableThButtonExpand as default };
//# sourceMappingURL=th-button-expand.js.map
