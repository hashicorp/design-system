import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';
import { HdsAdvancedTableThSortOrderValues, HdsAdvancedTableDensityValues, HdsAdvancedTableVerticalAlignmentValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div\n  class={{this.classNames}}\n  ...attributes\n  role=\"grid\"\n  aria-describedby={{this._captionId}}\n  {{style grid-template-columns=this.gridTemplateColumns}}\n  {{this._setUpObserver}}\n>\n  <div id={{this._captionId}} class=\"sr-only hds-advanced-table__caption\" aria-live=\"polite\">\n    {{@caption}}\n    {{this.sortedMessageText}}\n  </div>\n  <div class=\"hds-advanced-table__thead {{if @hasStickyHeader \'hds-advanced-table__thead--sticky\'}}\" role=\"rowgroup\">\n    <Hds::AdvancedTable::Tr\n      @selectionScope=\"col\"\n      @onClickSortBySelected={{if @selectableColumnKey (fn this.setSortBy @selectableColumnKey)}}\n      @sortBySelectedOrder={{if (eq this._sortBy @selectableColumnKey) this._sortOrder}}\n      @isSelectable={{this.isSelectable}}\n      @onSelectionChange={{this.onSelectionAllChange}}\n      @didInsert={{this.didInsertSelectAllCheckbox}}\n      @willDestroy={{this.willDestroySelectAllCheckbox}}\n      @selectionAriaLabelSuffix=\"all rows\"\n    >\n      {{#each @columns as |column|}}\n        {{#if column.isSortable}}\n          <Hds::AdvancedTable::ThSort\n            @sortOrder={{if (eq column.key this._sortBy) this._sortOrder}}\n            @onClickSort={{fn this.setSortBy column.key}}\n            @align={{column.align}}\n            @tooltip={{column.tooltip}}\n          >\n            {{column.label}}\n          </Hds::AdvancedTable::ThSort>\n        {{else}}\n          <Hds::AdvancedTable::Th\n            @align={{column.align}}\n            @tooltip={{column.tooltip}}\n            @isVisuallyHidden={{column.isVisuallyHidden}}\n          >{{column.label}}</Hds::AdvancedTable::Th>\n        {{/if}}\n      {{/each}}\n    </Hds::AdvancedTable::Tr>\n  </div>\n\n  <div class=\"hds-advanced-table__tbody\" role=\"rowgroup\">\n    {{! ----------------------------------------------------------------------------------------\n        IMPORTANT: we loop on the `model` array and for each record\n        we yield the Tr/Td/Th elements _and_ the record itself as `data`\n        this means the consumer will *have to* use the `data` key to access it in their template\n      -------------------------------------------------------------------------------------------- }}\n    {{#each (sort-by this.getSortCriteria @model) key=this.identityKey as |record index|}}\n      {{#if this.hasNestedRows}}\n        <Hds::AdvancedTable::ExpandableTrGroup\n          @record={{record}}\n          @childrenKey={{this.childrenKey}}\n          @rowIndex={{index}}\n          as |T|\n        >\n          {{yield\n            (hash\n              Tr=(component \"hds/advanced-table/tr\" isParentRow=T.isExpandable depth=T.depth)\n              Th=(component\n                \"hds/advanced-table/th\"\n                scope=\"row\"\n                isExpandable=T.isExpandable\n                newLabel=T.id\n                parentId=T.parentId\n                onClickToggle=T.onClickToggle\n                isExpanded=T.isExpanded\n                depth=T.depth\n              )\n              Td=(component \"hds/advanced-table/td\" align=@align)\n              data=T.data\n              isOpen=T.isExpanded\n              rowIndex=T.rowIndex\n            )\n            to=\"body\"\n          }}\n        </Hds::AdvancedTable::ExpandableTrGroup>\n      {{else}}\n        {{yield\n          (hash\n            Tr=(component\n              \"hds/advanced-table/tr\"\n              selectionScope=\"row\"\n              isSelectable=this.isSelectable\n              onSelectionChange=this.onSelectionRowChange\n              didInsert=this.didInsertRowCheckbox\n              willDestroy=this.willDestroyRowCheckbox\n              selectionAriaLabelSuffix=@selectionAriaLabelSuffix\n            )\n            Th=(component \"hds/advanced-table/th\" scope=\"row\")\n            Td=(component \"hds/advanced-table/td\" align=@align)\n            data=record\n            rowIndex=index\n          )\n          to=\"body\"\n        }}\n      {{/if}}\n    {{/each}}\n  </div>\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DENSITIES = Object.values(HdsAdvancedTableDensityValues);
const DEFAULT_DENSITY = HdsAdvancedTableDensityValues.Medium;
const VALIGNMENTS = Object.values(HdsAdvancedTableVerticalAlignmentValues);
const DEFAULT_VALIGN = HdsAdvancedTableVerticalAlignmentValues.Top;
class HdsAdvancedTable extends Component {
  static {
    g(this.prototype, "_sortBy", [tracked], function () {
      return this.args.sortBy ?? undefined;
    });
  }
  #_sortBy = (i(this, "_sortBy"), undefined);
  static {
    g(this.prototype, "_sortOrder", [tracked], function () {
      return this.args.sortOrder || HdsAdvancedTableThSortOrderValues.Asc;
    });
  }
  #_sortOrder = (i(this, "_sortOrder"), undefined);
  static {
    g(this.prototype, "_selectAllCheckbox", [tracked], function () {
      return undefined;
    });
  }
  #_selectAllCheckbox = (i(this, "_selectAllCheckbox"), undefined);
  static {
    g(this.prototype, "_isSelectAllCheckboxSelected", [tracked], function () {
      return undefined;
    });
  }
  #_isSelectAllCheckboxSelected = (i(this, "_isSelectAllCheckboxSelected"), undefined);
  _selectableRows = [];
  _captionId = 'caption-' + guidFor(this);
  _observer = undefined;
  get getSortCriteria() {
    // get the current column
    const currentColumn = this.args?.columns?.find(column => column.key === this._sortBy);
    if (
    // check if there is a custom sorting function associated with the current `sortBy` column (we assume the column has `isSortable`)
    currentColumn?.sortingFunction && typeof currentColumn.sortingFunction === 'function') {
      return currentColumn.sortingFunction;
    } else {
      // otherwise fallback to the default format "sortBy:sortOrder"
      return `${this._sortBy}:${this._sortOrder}`;
    }
  }
  get columnWidths() {
    const {
      columns
    } = this.args;
    const widths = new Array(columns.length);
    let hasCustomColumnWidth = false;
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (column?.['width']) {
        widths[i] = column.width;
        if (!hasCustomColumnWidth) hasCustomColumnWidth = true;
      }
    }
    return hasCustomColumnWidth ? widths : undefined;
  }
  get identityKey() {
    // we have to provide a way for the consumer to pass undefined because Ember tries to interpret undefined as missing an arg and therefore falls back to the default
    if (this.args.identityKey === 'none') {
      return undefined;
    } else {
      return this.args.identityKey ?? '@identity';
    }
  }
  get childrenKey() {
    const {
      childrenKey = 'children'
    } = this.args;
    return childrenKey;
  }
  get hasNestedRows() {
    const {
      model,
      columns
    } = this.args;
    let hasNestedRows = false;
    let isSortable = false;
    const sortableColumns = [];

    // if the model is not an array, assume there are no nested rows
    if (!Array.isArray(model)) return false;
    for (const column of columns) {
      if (column.isSortable) {
        isSortable = true;
        sortableColumns.push(column.label);
      }
    }
    for (const obj of model) {
      if (this.childrenKey in obj) {
        hasNestedRows = true;
        break;
      }
    }
    if (hasNestedRows) {
      assert(`Cannot have sortable columns if there are nested rows. Sortable columns are ${sortableColumns.toString()}`, !isSortable);
    }
    return hasNestedRows;
  }
  get sortedMessageText() {
    if (this.args.sortedMessageText) {
      return this.args.sortedMessageText;
    } else if (this._sortBy && this._sortOrder) {
      // we should allow the user to define a custom value here (e.g., for i18n) - tracked with HDS-965
      return `Sorted by ${this._sortBy} ${this._sortOrder}ending`;
    } else {
      return '';
    }
  }
  get isSelectable() {
    const {
      isSelectable = false
    } = this.args;
    if (this.hasNestedRows) {
      assert('@isSelectable must not be true if there are nested rows.', !isSelectable);
      return isSelectable;
    }
    return isSelectable;
  }
  get isStriped() {
    const {
      isStriped = false
    } = this.args;
    if (this.hasNestedRows) {
      assert('@isStriped must not be true if there are nested rows.', !isStriped);
      return isStriped;
    }
    return isStriped;
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

  // returns the grid-template-columns CSS attribute for the grid
  get gridTemplateColumns() {
    const {
      isSelectable,
      columns
    } = this.args;

    // if there is no custom column widths, each column is the same width and they take up the available space (except the select checkbox)
    if (!this.columnWidths) {
      return `${isSelectable ? 'auto ' : ''}repeat(${columns.length}, 1fr)`;
    }

    // if there is a select checkbox, the first column is 'auto' width to hug the checkbox content
    let style = isSelectable ? 'auto' : '';

    // check the custom column widths, if the current column has a custom width use the custom width. otherwise take the available space.
    for (let i = 0; i < this.columnWidths.length; i++) {
      style += ` ${this.columnWidths[i] ? this.columnWidths[i] : '1fr'}`;
    }
    return style;
  }
  get classNames() {
    const classes = ['hds-advanced-table'];
    if (this.isStriped) {
      classes.push('hds-advanced-table--striped');
    }
    if (this.density) {
      classes.push(`hds-advanced-table--density-${this.density}`);
    }
    if (this.valign) {
      classes.push(`hds-advanced-table--valign-${this.valign}`);
    }
    if (this.hasNestedRows) {
      classes.push(`hds-advanced-table--nested`);
    }
    return classes.join(' ');
  }
  _setUpObserver = modifier(element => {
    const stickyGridHeader = element.querySelector('.hds-advanced-table__thead.hds-advanced-table__thead--sticky');
    if (stickyGridHeader !== null) {
      this._observer = new IntersectionObserver(([element]) => element?.target.classList.toggle('hds-advanced-table__thead--is-pinned', element.intersectionRatio < 1), {
        threshold: [1]
      });
      this._observer.observe(stickyGridHeader);
    }
    return () => {
      if (this._observer) {
        this._observer.disconnect();
      }
    };
  });
  setSortBy(column) {
    if (this._sortBy === column) {
      // check to see if the column is already sorted and invert the sort order if so
      this._sortOrder = this._sortOrder === HdsAdvancedTableThSortOrderValues.Asc ? HdsAdvancedTableThSortOrderValues.Desc : HdsAdvancedTableThSortOrderValues.Asc;
    } else {
      // otherwise, set the sort order to ascending
      this._sortBy = column;
      this._sortOrder = HdsAdvancedTableThSortOrderValues.Asc;
    }
    const {
      onSort
    } = this.args;
    if (typeof onSort === 'function') {
      onSort(this._sortBy, this._sortOrder);
    }
  }
  static {
    n(this.prototype, "setSortBy", [action]);
  }
  onSelectionChangeCallback(checkbox, selectionKey) {
    const {
      onSelectionChange
    } = this.args;
    if (typeof onSelectionChange !== 'function') return;
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
  onSelectionAllChange() {
    this._selectableRows.forEach(row => {
      row.checkbox.checked = this._selectAllCheckbox?.checked ?? false;
      row.checkbox.dispatchEvent(new Event('toggle', {
        bubbles: false
      }));
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
      this._selectAllCheckbox.dispatchEvent(new Event('toggle', {
        bubbles: false
      }));
    }
  }
  static {
    n(this.prototype, "setSelectAllState", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsAdvancedTable);

export { DEFAULT_DENSITY, DEFAULT_VALIGN, DENSITIES, VALIGNMENTS, HdsAdvancedTable as default };
//# sourceMappingURL=index.js.map
