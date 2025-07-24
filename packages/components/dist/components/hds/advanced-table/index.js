import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';
import { schedule } from '@ember/runloop';
import HdsAdvancedTableTableModel from './models/table.js';
import { HdsAdvancedTableDensityValues, HdsAdvancedTableVerticalAlignmentValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class=\"hds-advanced-table__container\n    {{(if this.isStickyHeaderPinned \'hds-advanced-table__container--header-is-pinned\')}}\"\n  {{did-update this.setupTableModelData @columns @model @sortBy @sortOrder}}\n  ...attributes\n>\n  {{! Caption }}\n  <div id={{this._captionId}} class=\"sr-only hds-advanced-table__caption\" aria-live=\"polite\">\n    {{@caption}}\n    {{this.sortedMessageText}}\n  </div>\n\n  {{! Grid }}\n  <div\n    class={{this.classNames}}\n    role=\"grid\"\n    aria-describedby={{this._captionId}}\n    {{style\n      grid-template-columns=this.gridTemplateColumns\n      --hds-advanced-table-sticky-column-offset=this.stickyColumnOffset\n      max-height=@maxHeight\n    }}\n    {{this._setUpScrollWrapper}}\n  >\n    {{! Header }}\n    <div class={{this.theadClassNames}} role=\"rowgroup\" {{this._setUpThead}}>\n      <Hds::AdvancedTable::Tr\n        @selectionScope=\"col\"\n        @onClickSortBySelected={{if @selectableColumnKey (fn this._tableModel.setSortBy @selectableColumnKey)}}\n        @sortBySelectedOrder={{if (eq this._tableModel.sortBy @selectableColumnKey) this._tableModel.sortOrder}}\n        @isSelectable={{this.isSelectable}}\n        @onSelectionChange={{this.onSelectionAllChange}}\n        @didInsert={{this.didInsertSelectAllCheckbox}}\n        @willDestroy={{this.willDestroySelectAllCheckbox}}\n        @selectionAriaLabelSuffix=\"all rows\"\n        @hasStickyColumn={{@hasStickyFirstColumn}}\n        @isStickyColumnPinned={{this.isStickyColumnPinned}}\n      >\n        {{#each this._tableModel.columns as |column index|}}\n          {{#if column.isSortable}}\n            <Hds::AdvancedTable::ThSort\n              @column={{column}}\n              @sortOrder={{if (eq column.key this._tableModel.sortBy) this._tableModel.sortOrder}}\n              @onClickSort={{if column.key (fn this._tableModel.setSortBy column.key)}}\n              @align={{column.align}}\n              @tooltip={{column.tooltip}}\n              @hasResizableColumns={{@hasResizableColumns}}\n              @isStickyColumn={{if (and (eq index 0) @hasStickyFirstColumn) true}}\n              @isStickyColumnPinned={{this.isStickyColumnPinned}}\n              @tableHeight={{this._tableHeight}}\n              @onColumnResize={{@onColumnResize}}\n              {{this._setColumnWidth column}}\n            >\n              {{column.label}}\n            </Hds::AdvancedTable::ThSort>\n          {{else}}\n            <Hds::AdvancedTable::Th\n              @align={{column.align}}\n              @column={{column}}\n              @hasExpandAllButton={{this._tableModel.hasRowsWithChildren}}\n              @hasResizableColumns={{@hasResizableColumns}}\n              @isExpanded={{this._tableModel.expandState}}\n              @isExpandable={{column.isExpandable}}\n              @isStickyColumn={{if (and (eq index 0) @hasStickyFirstColumn) true}}\n              @isStickyColumnPinned={{this.isStickyColumnPinned}}\n              @isVisuallyHidden={{column.isVisuallyHidden}}\n              @tableHeight={{this._tableHeight}}\n              @tooltip={{column.tooltip}}\n              @onClickToggle={{this._tableModel.toggleAll}}\n              @onColumnResize={{@onColumnResize}}\n              {{this._setColumnWidth column}}\n            >\n              {{column.label}}\n            </Hds::AdvancedTable::Th>\n          {{/if}}\n        {{/each}}\n      </Hds::AdvancedTable::Tr>\n    </div>\n\n    {{! Body }}\n    <div class=\"hds-advanced-table__tbody\" role=\"rowgroup\">\n      {{! ----------------------------------------------------------------------------------------\n        IMPORTANT: we loop on the `model` array and for each record\n        we yield the Tr/Td/Th elements _and_ the record itself as `data`\n        this means the consumer will *have to* use the `data` key to access it in their template\n      -------------------------------------------------------------------------------------------- }}\n      {{#each this._tableModel.sortedRows key=this.identityKey as |record index|}}\n        {{#if this._tableModel.hasRowsWithChildren}}\n          <Hds::AdvancedTable::ExpandableTrGroup\n            @record={{record}}\n            @rowIndex={{index}}\n            @onClickToggle={{record.onClickToggle}}\n            as |T|\n          >\n            {{yield\n              (hash\n                Tr=(component\n                  \"hds/advanced-table/tr\"\n                  isLastRow=(eq this._tableModel.lastVisibleRow.id T.data.id)\n                  isParentRow=T.isExpandable\n                  depth=T.depth\n                  displayRow=T.shouldDisplayChildRows\n                )\n                Th=(component\n                  \"hds/advanced-table/th\"\n                  depth=T.depth\n                  isExpandable=T.isExpandable\n                  isExpanded=T.isExpanded\n                  newLabel=T.id\n                  parentId=T.parentId\n                  scope=\"row\"\n                  onClickToggle=T.onClickToggle\n                )\n                Td=(component \"hds/advanced-table/td\" align=@align)\n                data=T.data\n                isOpen=T.isExpanded\n                rowIndex=T.rowIndex\n              )\n              to=\"body\"\n            }}\n          </Hds::AdvancedTable::ExpandableTrGroup>\n        {{else}}\n          {{yield\n            (hash\n              Tr=(component\n                \"hds/advanced-table/tr\"\n                selectionScope=\"row\"\n                isLastRow=(eq this._tableModel.lastVisibleRow.id record.id)\n                isSelectable=this.isSelectable\n                onSelectionChange=this.onSelectionRowChange\n                didInsert=this.didInsertRowCheckbox\n                willDestroy=this.willDestroyRowCheckbox\n                selectionAriaLabelSuffix=@selectionAriaLabelSuffix\n                hasStickyColumn=@hasStickyFirstColumn\n                isStickyColumnPinned=this.isStickyColumnPinned\n              )\n              Th=(component\n                \"hds/advanced-table/th\"\n                scope=\"row\"\n                isStickyColumn=@hasStickyFirstColumn\n                isStickyColumnPinned=this.isStickyColumnPinned\n              )\n              Td=(component \"hds/advanced-table/td\" align=@align)\n              data=record\n              rowIndex=index\n            )\n            to=\"body\"\n          }}\n        {{/if}}\n      {{/each}}\n    </div>\n  </div>\n\n  {{#if this.showScrollIndicatorLeft}}\n    <div\n      class=\"hds-advanced-table__scroll-indicator hds-advanced-table__scroll-indicator-left\"\n      {{style height=this.scrollIndicatorDimensions.height left=this.scrollIndicatorDimensions.left}}\n    />\n  {{/if}}\n\n  {{#if this.showScrollIndicatorRight}}\n    <div\n      class=\"hds-advanced-table__scroll-indicator hds-advanced-table__scroll-indicator-right\"\n      {{style height=this.scrollIndicatorDimensions.height right=this.scrollIndicatorDimensions.right}}\n    />\n  {{/if}}\n\n  {{#if this.showScrollIndicatorTop}}\n    <div\n      class=\"hds-advanced-table__scroll-indicator hds-advanced-table__scroll-indicator-top\"\n      {{style top=this.scrollIndicatorDimensions.top width=this.scrollIndicatorDimensions.width}}\n    />\n  {{/if}}\n\n  {{#if this.showScrollIndicatorBottom}}\n    <div\n      class=\"hds-advanced-table__scroll-indicator hds-advanced-table__scroll-indicator-bottom\"\n      {{style bottom=this.scrollIndicatorDimensions.bottom width=this.scrollIndicatorDimensions.width}}\n    />\n  {{/if}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DENSITIES = Object.values(HdsAdvancedTableDensityValues);
const DEFAULT_DENSITY = HdsAdvancedTableDensityValues.Medium;
const VALIGNMENTS = Object.values(HdsAdvancedTableVerticalAlignmentValues);
const DEFAULT_VALIGN = HdsAdvancedTableVerticalAlignmentValues.Top;
const DEFAULT_SCROLL_DIMENSIONS = {
  bottom: '0px',
  height: '0px',
  left: '0px',
  right: '0px',
  top: '0px',
  width: '0px'
};
const getScrollIndicatorDimensions = (scrollWrapper, theadElement, hasStickyHeader, hasStickyFirstColumn) => {
  const horizontalScrollBarHeight = scrollWrapper.offsetHeight - scrollWrapper.clientHeight;
  const verticalScrollBarWidth = scrollWrapper.offsetWidth - scrollWrapper.clientWidth;
  let leftOffset = 0;
  if (hasStickyFirstColumn) {
    const stickyColumnHeaders = theadElement.querySelectorAll('.hds-advanced-table__th--is-sticky-column');
    stickyColumnHeaders?.forEach(el => {
      // querySelectorAll returns Elements, which don't have offsetWidth
      // need to use offsetWidth to account for the cell borders
      const elAsHTMLElement = el;
      leftOffset += elAsHTMLElement.offsetWidth;
    });

    // offsets the left: -1px position if there are multiple sticky columns
    if (stickyColumnHeaders.length > 1) {
      leftOffset -= 1;
    }
  }
  return {
    bottom: `${horizontalScrollBarHeight}px`,
    height: `${scrollWrapper.offsetHeight - horizontalScrollBarHeight}px`,
    left: `${leftOffset}px`,
    right: `${verticalScrollBarWidth}px`,
    top: hasStickyHeader ? `${theadElement.offsetHeight}px` : '0px',
    width: `${scrollWrapper.offsetWidth - verticalScrollBarWidth}px`
  };
};
const getStickyColumnLeftOffset = (theadElement, hasRowSelection) => {
  // if there is no select checkbox column, the sticky column is all the way to the left
  if (!hasRowSelection) return '0px';
  const selectableCell = theadElement.querySelector('.hds-advanced-table__th--is-selectable');
  return `${selectableCell?.offsetWidth}px`;
};
class HdsAdvancedTable extends Component {
  static {
    g(this.prototype, "_selectAllCheckbox", [tracked], function () {
      return undefined;
    });
  }
  #_selectAllCheckbox = (i(this, "_selectAllCheckbox"), void 0);
  static {
    g(this.prototype, "_isSelectAllCheckboxSelected", [tracked], function () {
      return undefined;
    });
  }
  #_isSelectAllCheckboxSelected = (i(this, "_isSelectAllCheckboxSelected"), void 0);
  static {
    g(this.prototype, "_tableHeight", [tracked], function () {
      return 0;
    });
  }
  #_tableHeight = (i(this, "_tableHeight"), void 0);
  _selectableRows = [];
  _captionId = 'caption-' + guidFor(this);
  _tableModel;
  _scrollHandler;
  _resizeObserver;
  _theadElement;
  static {
    g(this.prototype, "scrollIndicatorDimensions", [tracked], function () {
      return DEFAULT_SCROLL_DIMENSIONS;
    });
  }
  #scrollIndicatorDimensions = (i(this, "scrollIndicatorDimensions"), void 0);
  static {
    g(this.prototype, "isStickyColumnPinned", [tracked], function () {
      return false;
    });
  }
  #isStickyColumnPinned = (i(this, "isStickyColumnPinned"), void 0);
  static {
    g(this.prototype, "isStickyHeaderPinned", [tracked], function () {
      return false;
    });
  }
  #isStickyHeaderPinned = (i(this, "isStickyHeaderPinned"), void 0);
  static {
    g(this.prototype, "showScrollIndicatorLeft", [tracked], function () {
      return false;
    });
  }
  #showScrollIndicatorLeft = (i(this, "showScrollIndicatorLeft"), void 0);
  static {
    g(this.prototype, "showScrollIndicatorRight", [tracked], function () {
      return false;
    });
  }
  #showScrollIndicatorRight = (i(this, "showScrollIndicatorRight"), void 0);
  static {
    g(this.prototype, "showScrollIndicatorTop", [tracked], function () {
      return false;
    });
  }
  #showScrollIndicatorTop = (i(this, "showScrollIndicatorTop"), void 0);
  static {
    g(this.prototype, "showScrollIndicatorBottom", [tracked], function () {
      return false;
    });
  }
  #showScrollIndicatorBottom = (i(this, "showScrollIndicatorBottom"), void 0);
  static {
    g(this.prototype, "stickyColumnOffset", [tracked], function () {
      return '0px';
    });
  }
  #stickyColumnOffset = (i(this, "stickyColumnOffset"), void 0);
  constructor(owner, args) {
    super(owner, args);
    const {
      model,
      columns,
      childrenKey,
      hasResizableColumns,
      sortBy,
      sortOrder,
      hasStickyFirstColumn,
      onSort
    } = args;
    this._tableModel = new HdsAdvancedTableTableModel({
      model,
      columns,
      childrenKey,
      hasResizableColumns,
      sortBy,
      sortOrder,
      onSort
    });
    if (this._tableModel.hasRowsWithChildren) {
      const sortableColumns = columns.filter(column => column.isSortable);
      const sortableColumnLabels = sortableColumns.map(column => column.label);
      assert(`Cannot have sortable columns if there are nested rows. Sortable columns are ${sortableColumnLabels.toString()}`, sortableColumns.length === 0);
      assert('Cannot have a sticky first column if there are nested rows.', !hasStickyFirstColumn);
      assert(`Cannot have resizable columns if there are nested rows.`, !hasResizableColumns);
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
  get childrenKey() {
    const {
      childrenKey = 'children'
    } = this.args;
    return childrenKey;
  }
  get hasScrollIndicator() {
    if (this.args.hasStickyFirstColumn) {
      return true;
    }
    return false;
  }
  get sortedMessageText() {
    const {
      sortedMessageText
    } = this.args;
    const {
      sortBy,
      sortOrder
    } = this._tableModel;
    if (sortedMessageText !== undefined) {
      return sortedMessageText;
    } else if (sortBy !== undefined && sortOrder !== undefined) {
      // we should allow the user to define a custom value here (e.g., for i18n) - tracked with HDS-965
      return `Sorted by ${sortBy} ${sortOrder}ending`;
    } else {
      return '';
    }
  }
  get isSelectable() {
    const {
      isSelectable = false
    } = this.args;
    if (this._tableModel.hasRowsWithChildren) {
      assert('@isSelectable must not be true if there are nested rows.', !isSelectable);
      return isSelectable;
    }
    return isSelectable;
  }
  get isStriped() {
    const {
      isStriped = false
    } = this.args;
    if (this._tableModel.hasRowsWithChildren) {
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
  get hasStickyHeader() {
    if (this.args.maxHeight && this.args.hasStickyHeader !== false) {
      return true;
    } else if (this.args.hasStickyHeader && !this.args.maxHeight) {
      assert('Must set @maxHeight to use @hasStickyHeader.', false);
    }
    return false;
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
      isSelectable
    } = this.args;
    const {
      columns
    } = this._tableModel;
    const DEFAULT_COLUMN_WIDTH = '1fr';

    // if there is a select checkbox, the first column has a 'min-content' width to hug the checkbox content
    let style = isSelectable ? 'min-content ' : '';
    const hasCustomColumnWidths = columns.some(column => column.width !== undefined);
    if (hasCustomColumnWidths) {
      // check the custom column widths, if the current column has a custom width use the custom width. otherwise take the available space.
      for (let i = 0; i < columns.length; i++) {
        style += ` ${columns[i].width ?? DEFAULT_COLUMN_WIDTH}`;
      }
    } else {
      // if there are no custom column widths, each column is the same width and they take up the available space
      style += `repeat(${columns.length}, ${DEFAULT_COLUMN_WIDTH})`;
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
    if (this._tableModel.hasRowsWithChildren) {
      classes.push(`hds-advanced-table--nested`);
    }
    return classes.join(' ');
  }
  get theadClassNames() {
    const classes = ['hds-advanced-table__thead'];
    if (this.hasStickyHeader) {
      classes.push('hds-advanced-table__thead--sticky');
    }
    if (this.isStickyHeaderPinned) {
      classes.push('hds-advanced-table__thead--is-pinned');
    }
    if (this._tableModel.hasResizableColumns) {
      classes.push('hds-advanced-table__thead--has-resizable-columns');
    }
    return classes.join(' ');
  }
  _setColumnWidth = modifier((element, [column]) => {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', () => {
      const width = element.offsetWidth;
      if (column.width === undefined) {
        column.setPxWidth(width);
        column.originalWidth = `${width}px`;
      }
    });
  });
  _setUpScrollWrapper = modifier(element => {
    this._scrollHandler = () => {
      // 6px as a buffer so the shadow doesn't appear over the border radius on the edge of the table
      const SCROLL_BUFFER = 6;

      // left scroll indicator and sticky column styles
      if (element.scrollLeft > SCROLL_BUFFER && !this.showScrollIndicatorLeft) {
        if (this.args.hasStickyFirstColumn) {
          this.isStickyColumnPinned = true;
        }
        this.showScrollIndicatorLeft = true;
      } else if (element.scrollLeft === 0 && this.showScrollIndicatorLeft) {
        this.isStickyColumnPinned = false;
        this.showScrollIndicatorLeft = false;
      }

      // the right edge is how far the user can scroll, which is the full width of the table - the visible section of the table (also subtract the buffer)
      const rightEdge = element.scrollWidth - element.clientWidth - SCROLL_BUFFER;

      // right scroll indicator
      if (element.scrollLeft < rightEdge) {
        this.showScrollIndicatorRight = true;
      } else {
        this.showScrollIndicatorRight = false;
      }

      // sticky header
      if (element.scrollTop > 0) {
        if (this.hasStickyHeader) {
          this.isStickyHeaderPinned = true;
        }
        this.showScrollIndicatorTop = true;
      } else {
        if (this.hasStickyHeader) {
          this.isStickyHeaderPinned = false;
        }
        this.showScrollIndicatorTop = false;
      }

      // the bottom edge is how far the user can scroll, which is the full height of the table - the visible section of the table (also subtract the buffer)
      const bottomEdge = element.scrollHeight - element.clientHeight - SCROLL_BUFFER;

      // bottom scroll indicator
      if (element.scrollTop < bottomEdge) {
        this.showScrollIndicatorBottom = true;
      } else {
        this.showScrollIndicatorBottom = false;
      }
    };
    element.addEventListener('scroll', this._scrollHandler);
    const updateMeasurements = () => {
      this._tableHeight = element.clientHeight;
      this.scrollIndicatorDimensions = getScrollIndicatorDimensions(element, this._theadElement, this.hasStickyHeader, hasStickyFirstColumn);
      if (hasStickyFirstColumn) {
        this.stickyColumnOffset = getStickyColumnLeftOffset(this._theadElement, isSelectable);
      }
    };
    const {
      hasStickyFirstColumn = false,
      isSelectable = false
    } = this.args;
    this._resizeObserver = new ResizeObserver(entries => {
      entries.forEach(() => {
        updateMeasurements();
      });
    });
    this._resizeObserver.observe(element);
    updateMeasurements();

    // on render check if should show right scroll indicator
    if (element.clientWidth < element.scrollWidth) {
      this.showScrollIndicatorRight = true;
    }

    // on render check if should show bottom scroll indicator
    if (element.clientHeight < element.scrollHeight) {
      this.showScrollIndicatorBottom = true;
    }
    return () => {
      element.removeEventListener('scroll', this._scrollHandler);
      this._resizeObserver.disconnect();
    };
  });
  _setUpThead = modifier(element => {
    this._theadElement = element;
  });
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
  setupTableModelData() {
    const {
      columns,
      model,
      sortBy,
      sortOrder
    } = this.args;
    this._tableModel.setupData({
      columns,
      model,
      sortBy,
      sortOrder
    });
  }
  static {
    n(this.prototype, "setupTableModelData", [action]);
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
setComponentTemplate(TEMPLATE, HdsAdvancedTable);

export { DEFAULT_DENSITY, DEFAULT_VALIGN, DENSITIES, VALIGNMENTS, HdsAdvancedTable as default };
//# sourceMappingURL=index.js.map
