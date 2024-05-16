import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<table class={{this.classNames}} ...attributes>\n  {{#if @columns}}\n    <caption class=\"sr-only\" aria-live=\"polite\">{{@caption}} {{this.sortedMessageText}}</caption>\n  {{else if @caption}}\n    <caption class=\"sr-only\">{{@caption}}</caption>\n  {{/if}}\n\n  <thead class=\"hds-table__thead\">\n    {{#if @columns}}\n      <Hds::Table::Tr\n        @selectionScope=\"col\"\n        @isSelectable={{@isSelectable}}\n        @onSelectionChange={{this.onSelectionAllChange}}\n        @didInsert={{this.didInsertSelectAllCheckbox}}\n        @willDestroy={{this.willDestroySelectAllCheckbox}}\n        @selectionAriaLabelSuffix=\"all rows\"\n      >\n        {{#each @columns as |column|}}\n          {{#if column.isSortable}}\n            <Hds::Table::ThSort\n              @sortOrder={{if (eq column.key this.sortBy) this.sortOrder}}\n              @onClickSort={{fn this.setSortBy column.key}}\n              @align={{column.align}}\n              @width={{column.width}}\n              @tooltip={{column.tooltip}}\n            >\n              {{column.label}}\n            </Hds::Table::ThSort>\n          {{else}}\n            <Hds::Table::Th\n              @align={{column.align}}\n              @width={{column.width}}\n              @tooltip={{column.tooltip}}\n              @isVisuallyHidden={{column.isVisuallyHidden}}\n            >{{column.label}}</Hds::Table::Th>\n          {{/if}}\n        {{/each}}\n      </Hds::Table::Tr>\n    {{else}}\n      {{yield\n        (hash\n          Tr=(component\n            \"hds/table/tr\"\n            selectionScope=\"col\"\n            isSelectable=@isSelectable\n            onSelectionChange=this.onSelectionAllChange\n            didInsert=this.didInsertSelectAllCheckbox\n            willDestroy=this.willDestroySelectAllCheckbox\n            selectionAriaLabelSuffix=\"all rows\"\n          )\n          Th=(component \"hds/table/th\")\n          ThSort=(component \"hds/table/th-sort\")\n          sortBy=this.sortBy\n          sortOrder=this.sortOrder\n          setSortBy=this.setSortBy\n        )\n        to=\"head\"\n      }}\n    {{/if}}\n  </thead>\n\n  <tbody class=\"hds-table__tbody\">\n    {{#if @columns}}\n      {{! ----------------------------------------------------------------------------------------\n        IMPORTANT: we loop on the `model` array and for each record\n        we yield the Tr/Td/Th elements _and_ the record itself as `data`\n        this means the consumer will *have to* use the `data` key to access it in their template\n      -------------------------------------------------------------------------------------------- }}\n      {{#each (sort-by this.getSortCriteria @model) key=this.identityKey as |record|}}\n        {{yield\n          (hash\n            Tr=(component\n              \"hds/table/tr\"\n              selectionScope=\"row\"\n              isSelectable=@isSelectable\n              onSelectionChange=this.onSelectionRowChange\n              didInsert=this.didInsertRowCheckbox\n              willDestroy=this.willDestroyRowCheckbox\n              selectionAriaLabelSuffix=@selectionAriaLabelSuffix\n            )\n            Th=(component \"hds/table/th\" scope=\"row\")\n            Td=(component \"hds/table/td\" align=@align)\n            data=record\n          )\n          to=\"body\"\n        }}\n      {{/each}}\n    {{else}}\n      {{yield\n        (hash\n          Tr=(component\n            \"hds/table/tr\"\n            selectionScope=\"row\"\n            isSelectable=@isSelectable\n            onSelectionChange=this.onSelectionRowChange\n            didInsert=this.didInsertRowCheckbox\n            willDestroy=this.willDestroyRowCheckbox\n            selectionAriaLabelSuffix=@selectionAriaLabelSuffix\n          )\n          Th=(component \"hds/table/th\" scope=\"row\")\n          Td=(component \"hds/table/td\" align=@align)\n          sortBy=this.sortBy\n          sortOrder=this.sortOrder\n        )\n        to=\"body\"\n      }}\n    {{/if}}\n  </tbody>\n</table>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DENSITIES = ['short', 'medium', 'tall'];
const DEFAULT_DENSITY = 'medium';
const VALIGNMENTS = ['top', 'middle', 'baseline'];
const DEFAULT_VALIGN = 'top';
class HdsTableIndexComponent extends Component {
  static {
    g(this.prototype, "sortBy", [tracked], function () {
      return this.args.sortBy;
    });
  }
  #sortBy = (i(this, "sortBy"), void 0);
  static {
    g(this.prototype, "sortOrder", [tracked], function () {
      return this.args.sortOrder || 'asc';
    });
  }
  #sortOrder = (i(this, "sortOrder"), void 0);
  static {
    g(this.prototype, "selectAllCheckbox", [tracked], function () {
      return undefined;
    });
  }
  #selectAllCheckbox = (i(this, "selectAllCheckbox"), void 0);
  selectableRows = [];
  static {
    g(this.prototype, "isSelectAllCheckboxSelected", [tracked], function () {
      return undefined;
    });
  }
  #isSelectAllCheckboxSelected = (i(this, "isSelectAllCheckboxSelected"), void 0);
  /**
   * @param getSortCriteria
   * @type {string | function}
   * @default sortBy:sortOrder
   * @description Returns the sort criteria
   */
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

  /**
   * @param identityKey
   * @type {string}
   * @default '@identity'
   * @description Returns the key to use for the table rows to provide more granular control. If no identityKey is defined, Ember's default `@identity` is used. See https://api.emberjs.com/ember/release/classes/Ember.Templates.helpers/methods/each?anchor=each
   * this would be relevant for any table that would have data that could update or change, i.e., polling.
   */
  get identityKey() {
    // we have to provide a way for the consumer to pass undefined because Ember tries to interpret undefined as missing an arg and therefore falls back to the default
    if (this.args.identityKey === 'none') {
      return undefined;
    } else {
      return this.args.identityKey ?? '@identity';
    }
  }

  /**
   * @param sortedMessageText
   * @type {string}
   * @default ''
   * @description Returns the text to display in the sorted message. If no text is defined, the default text is used.
   */
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

  /**
   * @param isStriped
   * @type {boolean}
   * @default false
   * @description Determines whether the table rows should have alternating background colors; defaults to false.
   */
  get isStriped() {
    return this.args.isStriped ?? false;
  }

  /**
   * @param isFixedLayout
   * @type {boolean}
   * @default false
   * @description Determines whether the table-display should be set to fixed; meaning, the table columns are of equal width no matter the content; defaults to false.
   */
  get isFixedLayout() {
    return this.args.isFixedLayout ?? false;
  }

  /**
   * @param density
   * @type {string}
   * @default 'medium'
   * @description Determines the density of the table cells; options are "short", "medium" and "tall". If no density is defined, "medium" is used.
   */
  get density() {
    let {
      density = DEFAULT_DENSITY
    } = this.args;
    assert(`@density for "Hds::Table" must be one of the following: ${DENSITIES.join(', ')}; received: ${density}`, DENSITIES.includes(density));
    return density;
  }

  /**
   * @param valign
   * @type {string}
   * @default 'top'
   * @description Determines the vertical alignment of the table cells; options are: "top", "middle", "baseline". If no valign is defined, "top" is used.
   */
  get valign() {
    let {
      valign = DEFAULT_VALIGN
    } = this.args;
    assert(`@valign for "Hds::Table" must be one of the following: ${VALIGNMENTS.join(', ')}; received: ${valign}`, VALIGNMENTS.includes(valign));
    return valign;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-table'];

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
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // otherwise, set the sort order to ascending
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
    let {
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
    let {
      onSelectionChange
    } = this.args;
    if (typeof onSelectionChange === 'function') {
      onSelectionChange({
        selectionKey: selectionKey,
        selectionCheckboxElement: checkbox,
        selectedRowsKeys: this.selectableRows.reduce((acc, row) => {
          if (row.checkbox.checked) {
            acc.push(row.selectionKey);
          }
          return acc;
        }, []),
        selectableRowsStates: this.selectableRows.reduce((acc, row) => {
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
    this.selectableRows.forEach(row => {
      row.checkbox.checked = this.selectAllCheckbox.checked;
      row.checkbox.dispatchEvent(new Event('toggle', {
        bubbles: false
      }));
    });
    this.isSelectAllCheckboxSelected = this.selectAllCheckbox.checked;
    this.onSelectionChangeCallback(this.selectAllCheckbox, 'all');
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
    this.selectAllCheckbox = checkbox;
  }
  static {
    n(this.prototype, "didInsertSelectAllCheckbox", [action]);
  }
  willDestroySelectAllCheckbox() {
    this.selectAllCheckbox = undefined;
  }
  static {
    n(this.prototype, "willDestroySelectAllCheckbox", [action]);
  }
  didInsertRowCheckbox(checkbox, selectionKey) {
    this.selectableRows.push({
      selectionKey,
      checkbox
    });
    this.setSelectAllState();
  }
  static {
    n(this.prototype, "didInsertRowCheckbox", [action]);
  }
  willDestroyRowCheckbox(selectionKey) {
    this.selectableRows = this.selectableRows.filter(row => row.selectionKey !== selectionKey);
    this.setSelectAllState();
  }
  static {
    n(this.prototype, "willDestroyRowCheckbox", [action]);
  }
  setSelectAllState() {
    if (this.selectAllCheckbox) {
      let selectableRowsCount = this.selectableRows.length;
      let selectedRowsCount = this.selectableRows.filter(row => row.checkbox.checked).length;
      this.selectAllCheckbox.checked = selectedRowsCount === selectableRowsCount;
      this.selectAllCheckbox.indeterminate = selectedRowsCount > 0 && selectedRowsCount < selectableRowsCount;
      this.isSelectAllCheckboxSelected = this.selectAllCheckbox.checked;
      this.selectAllCheckbox.dispatchEvent(new Event('toggle', {
        bubbles: false
      }));
    }
  }
  static {
    n(this.prototype, "setSelectAllState", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsTableIndexComponent);

export { DENSITIES, HdsTableIndexComponent as default };
//# sourceMappingURL=index.js.map
