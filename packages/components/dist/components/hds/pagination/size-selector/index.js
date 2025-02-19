import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-pagination-size-selector\" ...attributes>\n  <label class=\"hds-typography-body-100 hds-font-weight-medium\" for={{this._sizeSelectorId}}>\n    {{this.label}}\n  </label>\n  <Hds::Form::Select::Base id={{this._sizeSelectorId}} {{on \"change\" this.onChange}} as |S|>\n    <S.Options>\n      {{#each this.pageSizes as |size|}}\n        <option value={{size}} selected={{if (eq size this.selectedSize) true null}}>{{size}}</option>\n      {{/each}}\n    </S.Options>\n  </Hds::Form::Select::Base>\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsPaginationSizeSelector extends Component {
  _sizeSelectorId = 'pagination-size-selector-' + guidFor(this);
  get pageSizes() {
    const {
      pageSizes
    } = this.args;
    assert('@pageSizes for "Pagination::SizeSelector" must be defined', pageSizes !== undefined);
    return pageSizes;
  }
  get selectedSize() {
    const {
      selectedSize
    } = this.args;
    assert(`@selectedSize for "Pagination::SizeSelector" must one of the @pageSizes provided (${this.pageSizes.join(',')}), received ${selectedSize}`, selectedSize === undefined || this.pageSizes.includes(selectedSize));
    return selectedSize;
  }
  get label() {
    const {
      label = 'Items per page'
    } = this.args;
    return label;
  }
  onChange(e) {
    const {
      onChange
    } = this.args;
    const target = e.target;
    if (typeof onChange === 'function') {
      onChange(parseInt(target.value));
    }
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsPaginationSizeSelector);

export { HdsPaginationSizeSelector as default };
//# sourceMappingURL=index.js.map
