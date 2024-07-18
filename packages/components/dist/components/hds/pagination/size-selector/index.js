import { _ as _applyDecoratedDescriptor, a as _defineProperty } from '../../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-pagination-size-selector\" ...attributes>\n  <label class=\"hds-typography-body-100 hds-font-weight-medium\" for={{this.SizeSelectorId}}>\n    {{this.label}}\n  </label>\n  <Hds::Form::Select::Base id={{this.SizeSelectorId}} {{on \"change\" this.onChange}} as |S|>\n    <S.Options>\n      {{#each this.pageSizes as |size|}}\n        <option value={{size}} selected={{if (eq size this.selectedSize) true null}}>{{size}}</option>\n      {{/each}}\n    </S.Options>\n  </Hds::Form::Select::Base>\n</div>");

var _class;
let HdsPaginationSizeSelectorComponent = (_class = class HdsPaginationSizeSelectorComponent extends Component {
  constructor(...args) {
    super(...args);
    /**
     * Generates a unique ID for the pageSize select
     *
     * @param SizeSelectorId
     */
    _defineProperty(this, "SizeSelectorId", 'pagination-size-selector-' + guidFor(this));
  }
  /**
   * @param pageSizes
   * @type {array of numbers}
   * @description Set the page sizes users can select from.
   */
  get pageSizes() {
    let {
      pageSizes
    } = this.args;
    assert('@pageSizes for "Pagination::SizeSelector" must be defined', pageSizes !== undefined);
    return pageSizes;
  }

  /**
   * @param selectedSize
   * @type integer
   * @description The selected ("current") page size
   */
  get selectedSize() {
    let {
      selectedSize
    } = this.args;
    assert(`@selectedSize for "Pagination::SizeSelector" must one of the @pageSizes provided (${this.pageSizes.join(',')}), received ${selectedSize}`, selectedSize === undefined || this.pageSizes.includes(selectedSize));
    return selectedSize;
  }

  /**
   * @param label
   * @type string
   * @default "Items per page"
   * @description The label text for the select
   */
  get label() {
    let {
      label = 'Items per page'
    } = this.args;
    return label;
  }
  onChange(e) {
    let {
      onChange
    } = this.args;
    if (typeof onChange === 'function') {
      onChange(parseInt(e.target.value));
    }
  }
}, (_applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsPaginationSizeSelectorComponent);

export { HdsPaginationSizeSelectorComponent as default };
//# sourceMappingURL=index.js.map
