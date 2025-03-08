import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { HdsTableThSortOrderValues, HdsTableDensityValues, HdsTableVerticalAlignmentValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<table class={{this.classNames}} ...attributes>\n  {{#if @columns}}\n    <caption class=\"sr-only\" aria-live=\"polite\">{{@caption}} {{this.sortedMessageText}}</caption>\n  {{else if @caption}}\n    <caption class=\"sr-only\">{{@caption}}</caption>\n  {{/if}}\n\n  <thead class=\"hds-table__thead\">\n    {{#if @columns}}\n      <Hds::Table::Tr\n        @selectionScope=\"col\"\n        @onClickSortBySelected={{if @selectableColumnKey (fn this.setSortBy @selectableColumnKey)}}\n        @sortBySelectedOrder={{if (eq this.sortBy @selectableColumnKey) this.sortOrder}}\n        @isSelectable={{@isSelectable}}\n        @onSelectionChange={{this.onSelectionAllChange}}\n        @didInsert={{this.didInsertSelectAllCheckbox}}\n        @willDestroy={{this.willDestroySelectAllCheckbox}}\n        @selectionAriaLabelSuffix=\"all rows\"\n      >\n        {{#each @columns as |column|}}\n          {{#if column.isSortable}}\n            <Hds::Table::ThSort\n              @sortOrder={{if (eq column.key this.sortBy) this.sortOrder}}\n              @onClickSort={{fn this.setSortBy column.key}}\n              @align={{column.align}}\n              @width={{column.width}}\n              @tooltip={{column.tooltip}}\n            >\n              {{column.label}}\n            </Hds::Table::ThSort>\n          {{else}}\n            <Hds::Table::Th\n              @align={{column.align}}\n              @width={{column.width}}\n              @tooltip={{column.tooltip}}\n              @isVisuallyHidden={{column.isVisuallyHidden}}\n            >{{column.label}}</Hds::Table::Th>\n          {{/if}}\n        {{/each}}\n      </Hds::Table::Tr>\n    {{else}}\n      {{yield\n        (hash\n          Tr=(component\n            \"hds/table/tr\"\n            selectionScope=\"col\"\n            isSelectable=@isSelectable\n            onSelectionChange=this.onSelectionAllChange\n            didInsert=this.didInsertSelectAllCheckbox\n            willDestroy=this.willDestroySelectAllCheckbox\n            selectionAriaLabelSuffix=\"all rows\"\n            onClickSortBySelected=(if @selectableColumnKey (fn this.setSortBy @selectableColumnKey))\n            sortBySelectedOrder=(if (eq this.sortBy @selectableColumnKey) this.sortOrder)\n          )\n          Th=(component \"hds/table/th\")\n          ThSort=(component \"hds/table/th-sort\")\n          sortBy=this.sortBy\n          sortOrder=this.sortOrder\n          setSortBy=this.setSortBy\n        )\n        to=\"head\"\n      }}\n    {{/if}}\n  </thead>\n\n  <tbody class=\"hds-table__tbody\">\n    {{#if @columns}}\n      {{! ----------------------------------------------------------------------------------------\n        IMPORTANT: we loop on the `model` array and for each record\n        we yield the Tr/Td/Th elements _and_ the record itself as `data`\n        this means the consumer will *have to* use the `data` key to access it in their template\n      -------------------------------------------------------------------------------------------- }}\n      {{#each (sort-by this.getSortCriteria @model) key=this.identityKey as |record index|}}\n        {{yield\n          (hash\n            Tr=(component\n              \"hds/table/tr\"\n              selectionScope=\"row\"\n              isSelectable=@isSelectable\n              onSelectionChange=this.onSelectionRowChange\n              didInsert=this.didInsertRowCheckbox\n              willDestroy=this.willDestroyRowCheckbox\n              selectionAriaLabelSuffix=@selectionAriaLabelSuffix\n            )\n            Th=(component \"hds/table/th\" scope=\"row\")\n            Td=(component \"hds/table/td\" align=@align)\n            data=record\n            rowIndex=index\n          )\n          to=\"body\"\n        }}\n      {{/each}}\n    {{else}}\n      {{yield\n        (hash\n          Tr=(component\n            \"hds/table/tr\"\n            selectionScope=\"row\"\n            isSelectable=@isSelectable\n            onSelectionChange=this.onSelectionRowChange\n            didInsert=this.didInsertRowCheckbox\n            willDestroy=this.willDestroyRowCheckbox\n            selectionAriaLabelSuffix=@selectionAriaLabelSuffix\n          )\n          Th=(component \"hds/table/th\" scope=\"row\")\n          Td=(component \"hds/table/td\" align=@align)\n          sortBy=this.sortBy\n          sortOrder=this.sortOrder\n        )\n        to=\"body\"\n      }}\n    {{/if}}\n  </tbody>\n</table>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DENSITIES = Object.values(HdsTableDensityValues);
const DEFAULT_DENSITY = HdsTableDensityValues.Medium;
const VALIGNMENTS = Object.values(HdsTableVerticalAlignmentValues);
const DEFAULT_VALIGN = HdsTableVerticalAlignmentValues.Top;
class HdsTable extends Component {
  static {
    g(this.prototype, "sortBy", [tracked]);
  }
  #sortBy = (i(this, "sortBy"), undefined);
  static {
    g(this.prototype, "sortOrder", [tracked]);
  }
  #sortOrder = (i(this, "sortOrder"), undefined);
  static {
    g(this.prototype, "_selectAllCheckbox", [tracked], function () {
      return undefined;
    });
  }
  #_selectAllCheckbox = (i(this, "_selectAllCheckbox"), undefined);
  _selectableRows = [];
  static {
    g(this.prototype, "_isSelectAllCheckboxSelected", [tracked], function () {
      return undefined;
    });
  }
  #_isSelectAllCheckboxSelected = (i(this, "_isSelectAllCheckboxSelected"), undefined);
  constructor(owner, args) {
    super(owner, args);
    this.sortBy = this.args.sortBy ?? undefined;
    this.sortOrder = this.args.sortOrder ?? HdsTableThSortOrderValues.Asc;
  }
  get getSortCriteria() {
    // get the current column
    const currentColumn = this.args?.columns?.find(column => column.key === this.sortBy);
    if (
    // check if there is a custom sorting function associated with the current `sortBy` column (we assume the column has `isSortable`)
    currentColumn?.sortingFunction && typeof currentColumn.sortingFunction === 'function') {
      return currentColumn.sortingFunction;
    } else {
      // otherwise fallback to the default format "sortBy:sortOrder"
      return `${this.sortBy}:${this.sortOrder}`;
    }
  }
  get identityKey() {
    // we have to provide a way for the consumer to pass undefined because Ember tries to interpret undefined as missing an arg and therefore falls back to the default
    if (this.args.identityKey === 'none') {
      return undefined;
    } else {
      return this.args.identityKey ?? '@identity';
    }
  }
  get sortedMessageText() {
    if (this.args.sortedMessageText) {
      return this.args.sortedMessageText;
    } else if (this.sortBy && this.sortOrder) {
      // we should allow the user to define a custom value here (e.g., for i18n) - tracked with HDS-965
      return `Sorted by ${this.sortBy} ${this.sortOrder}ending`;
    } else {
      return '';
    }
  }
  get isStriped() {
    return this.args.isStriped ?? false;
  }
  get isFixedLayout() {
    return this.args.isFixedLayout ?? false;
  }
  get density() {
    const {
      density = DEFAULT_DENSITY
    } = this.args;
    assert(`@density for "Hds::Table" must be one of the following: ${DENSITIES.join(', ')}; received: ${density}`, DENSITIES.includes(density));
    return density;
  }
  get valign() {
    const {
      valign = DEFAULT_VALIGN
    } = this.args;
    assert(`@valign for "Hds::Table" must be one of the following: ${VALIGNMENTS.join(', ')}; received: ${valign}`, VALIGNMENTS.includes(valign));
    return valign;
  }
  get classNames() {
    const classes = ['hds-table'];

    // add a class based on the @isStriped argument
    if (this.isStriped) {
      classes.push('hds-table--striped');
    }

    // add a class based on the @isFixedLayout argument
    if (this.isFixedLayout) {
      classes.push('hds-table--layout-fixed');
    }

    // add a class based on the @density argument
    if (this.density) {
      classes.push(`hds-table--density-${this.density}`);
    }

    // add a class based on the @valign argument
    if (this.valign) {
      classes.push(`hds-table--valign-${this.valign}`);
    }
    return classes.join(' ');
  }
  setSortBy(column) {
    if (this.sortBy === column) {
      // check to see if the column is already sorted and invert the sort order if so
      this.sortOrder = this.sortOrder === HdsTableThSortOrderValues.Asc ? HdsTableThSortOrderValues.Desc : HdsTableThSortOrderValues.Asc;
    } else {
      // otherwise, set the sort order to ascending
      this.sortBy = column;
      this.sortOrder = HdsTableThSortOrderValues.Asc;
    }
    const {
      onSort
    } = this.args;
    if (typeof onSort === 'function') {
      onSort(this.sortBy, this.sortOrder);
    }
  }
  static {
    n(this.prototype, "setSortBy", [action]);
  }
  onSelectionChangeCallback(checkbox, selectionKey) {
    const {
      onSelectionChange
    } = this.args;
    if (typeof onSelectionChange === 'function') {
      onSelectionChange({
        selectionKey: selectionKey,
        selectionCheckboxElement: checkbox,
        selectedRowsKeys: this._selectableRows.reduce((acc, row) => {
          if (row.checkbox.checked) {
            acc.push(row.selectionKey);
          }
          return acc;
        }, []),
        selectableRowsStates: this._selectableRows.reduce((acc, row) => {
          acc.push({
            selectionKey: row.selectionKey,
            isSelected: row.checkbox.checked
          });
          return acc;
        }, [])
      });
    }
  }
  onSelectionAllChange() {
    this._selectableRows.forEach(row => {
      row.checkbox.checked = this._selectAllCheckbox?.checked ?? false;
    });
    this._isSelectAllCheckboxSelected = this._selectAllCheckbox?.checked ?? false;
    this.onSelectionChangeCallback(this._selectAllCheckbox, 'all');
  }
  static {
    n(this.prototype, "onSelectionAllChange", [action]);
  }
  onSelectionRowChange(checkbox, selectionKey) {
    this.setSelectAllState();
    this.onSelectionChangeCallback(checkbox, selectionKey);
  }
  static {
    n(this.prototype, "onSelectionRowChange", [action]);
  }
  didInsertSelectAllCheckbox(checkbox) {
    this._selectAllCheckbox = checkbox;
  }
  static {
    n(this.prototype, "didInsertSelectAllCheckbox", [action]);
  }
  willDestroySelectAllCheckbox() {
    this._selectAllCheckbox = undefined;
  }
  static {
    n(this.prototype, "willDestroySelectAllCheckbox", [action]);
  }
  didInsertRowCheckbox(checkbox, selectionKey) {
    if (selectionKey) {
      this._selectableRows.push({
        selectionKey,
        checkbox
      });
    }
    this.setSelectAllState();
  }
  static {
    n(this.prototype, "didInsertRowCheckbox", [action]);
  }
  willDestroyRowCheckbox(selectionKey) {
    this._selectableRows = this._selectableRows.filter(row => row.selectionKey !== selectionKey);
    this.setSelectAllState();
  }
  static {
    n(this.prototype, "willDestroyRowCheckbox", [action]);
  }
  setSelectAllState() {
    if (this._selectAllCheckbox) {
      const selectableRowsCount = this._selectableRows.length;
      const selectedRowsCount = this._selectableRows.filter(row => row.checkbox.checked).length;
      this._selectAllCheckbox.checked = selectedRowsCount === selectableRowsCount;
      this._selectAllCheckbox.indeterminate = selectedRowsCount > 0 && selectedRowsCount < selectableRowsCount;
      this._isSelectAllCheckboxSelected = this._selectAllCheckbox.checked;
    }
  }
  static {
    n(this.prototype, "setSelectAllState", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsTable);

export { DEFAULT_DENSITY, DEFAULT_VALIGN, DENSITIES, VALIGNMENTS, HdsTable as default };
//# sourceMappingURL=index.js.map
