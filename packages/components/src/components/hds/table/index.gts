/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { fn, hash } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { sortBy } from '@nullvoxpopuli/ember-composable-helpers';

import type { WithBoundArgs } from '@glint/template';
import type Owner from '@ember/owner';

import {
  HdsTableDensityValues,
  HdsTableThSortOrderValues,
  HdsTableVerticalAlignmentValues,
} from './types.ts';
import HdsTableTr from './tr.gts';
import HdsTableTh from './th.gts';
import HdsTableThSort from './th-sort.gts';
import HdsTableTd from './td.gts';

import type {
  HdsTableColumn,
  HdsTableDensities,
  HdsTableHorizontalAlignment,
  HdsTableOnSelectionChangeSignature,
  HdsTableSelectableRow,
  HdsTableSortingFunction,
  HdsTableThSortOrder,
  HdsTableVerticalAlignment,
  HdsTableModel,
} from './types.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base.gts';
import type HdsIntlService from '../../../services/hds-intl.ts';

export const DENSITIES: HdsTableDensities[] = Object.values(
  HdsTableDensityValues
);
export const DEFAULT_DENSITY = HdsTableDensityValues.Medium;

export const VALIGNMENTS: HdsTableVerticalAlignment[] = Object.values(
  HdsTableVerticalAlignmentValues
);
export const DEFAULT_VALIGN = HdsTableVerticalAlignmentValues.Top;

export interface HdsTableSignature<T = HdsTableModel> {
  Args: {
    align?: HdsTableHorizontalAlignment;
    caption?: string;
    columns?: HdsTableColumn[];
    density?: HdsTableDensities;
    identityKey?: string;
    isFixedLayout?: boolean;
    isSelectable?: boolean;
    isStriped?: boolean;
    model?: T[];
    onSelectionChange?: (selection: HdsTableOnSelectionChangeSignature) => void;
    onSort?: (sortBy: string, sortOrder: HdsTableThSortOrder) => void;
    selectionAriaLabelSuffix?: string;
    sortBy?: string;
    selectableColumnKey?: string;
    sortedMessageText?: string;
    sortOrder?: HdsTableThSortOrder;
    valign?: HdsTableVerticalAlignment;
  };
  Blocks: {
    head?: [
      {
        Tr?: WithBoundArgs<
          typeof HdsTableTr,
          | 'selectionScope'
          | 'isSelectable'
          | 'onSelectionChange'
          | 'didInsert'
          | 'willDestroy'
          | 'selectionAriaLabelSuffix'
          | 'onClickSortBySelected'
          | 'sortBySelectedOrder'
        >;
        Th?: typeof HdsTableTh;
        ThSort?: typeof HdsTableThSort;
        sortBy?: string;
        sortOrder?: HdsTableThSortOrder;
        setSortBy?: (column: string) => void;
      },
    ];
    body?: [
      {
        Td?: WithBoundArgs<typeof HdsTableTd, 'align'>;
        Tr?: WithBoundArgs<
          typeof HdsTableTr,
          | 'selectionScope'
          | 'isSelectable'
          | 'onSelectionChange'
          | 'didInsert'
          | 'willDestroy'
          | 'selectionAriaLabelSuffix'
        >;
        Th?: WithBoundArgs<typeof HdsTableTh, 'scope'>;
        data?: T;
        rowIndex?: number;
        sortBy?: string;
        sortOrder?: HdsTableThSortOrder;
      },
    ];
  };
  Element: HTMLTableElement;
}

export default class HdsTable<T = HdsTableModel> extends Component<
  HdsTableSignature<T>
> {
  @service declare readonly hdsIntl: HdsIntlService;

  @tracked sortBy;
  @tracked sortOrder;
  @tracked
  private _selectAllCheckbox?: HdsFormCheckboxBaseSignature['Element'] =
    undefined;
  private _selectableRows: HdsTableSelectableRow[] = [];
  @tracked private _isSelectAllCheckboxSelected?: boolean = undefined;

  constructor(owner: Owner, args: HdsTableSignature<T>['Args']) {
    super(owner, args);
    this.sortBy = this.args.sortBy ?? undefined;
    this.sortOrder = this.args.sortOrder ?? HdsTableThSortOrderValues.Asc;
  }

  get getSortCriteria(): string | HdsTableSortingFunction<unknown> {
    // get the current column
    const currentColumn = this.args?.columns?.find(
      (column) => column.key === this.sortBy
    );
    if (
      // check if there is a custom sorting function associated with the current `sortBy` column (we assume the column has `isSortable`)
      currentColumn?.sortingFunction &&
      typeof currentColumn.sortingFunction === 'function'
    ) {
      return currentColumn.sortingFunction;
    } else {
      // otherwise fallback to the default format "sortBy:sortOrder"
      return `${this.sortBy}:${this.sortOrder}`;
    }
  }

  get identityKey(): string | undefined {
    // we have to provide a way for the consumer to pass undefined because Ember tries to interpret undefined as missing an arg and therefore falls back to the default
    if (this.args.identityKey === 'none') {
      return undefined;
    } else {
      return this.args.identityKey ?? '@identity';
    }
  }

  get sortedMessageText(): string {
    if (this.args.sortedMessageText) {
      return this.args.sortedMessageText;
    } else if (this.sortBy && this.sortOrder) {
      // we should allow the user to define a custom value here (e.g., for i18n) - tracked with HDS-965
      const translatedSortOrder = {
        [HdsTableThSortOrderValues.Asc]: this.hdsIntl.t(
          'hds.components.common.ascending',
          { default: 'ascending' }
        ),
        [HdsTableThSortOrderValues.Desc]: this.hdsIntl.t(
          'hds.components.common.descending',
          { default: 'descending' }
        ),
      }[this.sortOrder];
      const lowerCaseTranslatedSortOrder = translatedSortOrder.toLowerCase();

      return this.hdsIntl.t('hds.components.table.sorted-message-text', {
        sortBy: this.sortBy,
        sortOrder: lowerCaseTranslatedSortOrder,
        default: `Sorted by ${this.sortBy} ${lowerCaseTranslatedSortOrder}`,
      });
    } else {
      return '';
    }
  }

  get isStriped(): boolean {
    return this.args.isStriped ?? false;
  }

  get isFixedLayout(): boolean {
    return this.args.isFixedLayout ?? false;
  }

  get density(): HdsTableDensities {
    const { density = DEFAULT_DENSITY } = this.args;

    assert(
      `@density for "Hds::Table" must be one of the following: ${DENSITIES.join(
        ', '
      )}; received: ${density}`,
      DENSITIES.includes(density)
    );

    return density;
  }

  get valign(): HdsTableVerticalAlignment {
    const { valign = DEFAULT_VALIGN } = this.args;

    assert(
      `@valign for "Hds::Table" must be one of the following: ${VALIGNMENTS.join(
        ', '
      )}; received: ${valign}`,
      VALIGNMENTS.includes(valign)
    );

    return valign;
  }

  get classNames(): string {
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

  setSortBy = (column: string): void => {
    if (this.sortBy === column) {
      // check to see if the column is already sorted and invert the sort order if so
      this.sortOrder =
        this.sortOrder === HdsTableThSortOrderValues.Asc
          ? HdsTableThSortOrderValues.Desc
          : HdsTableThSortOrderValues.Asc;
    } else {
      // otherwise, set the sort order to ascending
      this.sortBy = column;
      this.sortOrder = HdsTableThSortOrderValues.Asc;
    }

    const { onSort } = this.args;

    if (typeof onSort === 'function') {
      onSort(this.sortBy, this.sortOrder);
    }
  };

  onSelectionChangeCallback = (
    checkbox?: HdsFormCheckboxBaseSignature['Element'],
    selectionKey?: string
  ): void => {
    const { onSelectionChange } = this.args;
    if (typeof onSelectionChange === 'function') {
      onSelectionChange({
        selectionKey: selectionKey,
        selectionCheckboxElement: checkbox,
        selectedRowsKeys: this._selectableRows.reduce<string[]>((acc, row) => {
          if (row.checkbox.checked) {
            acc.push(row.selectionKey);
          }
          return acc;
        }, []),
        selectableRowsStates: this._selectableRows.reduce(
          (
            acc: { selectionKey: string; isSelected: boolean | undefined }[],
            row
          ) => {
            acc.push({
              selectionKey: row.selectionKey,
              isSelected: row.checkbox.checked,
            });
            return acc;
          },
          []
        ),
      });
    }
  };

  onSelectionAllChange = (): void => {
    this._selectableRows.forEach((row) => {
      row.checkbox.checked = this._selectAllCheckbox?.checked ?? false;
    });
    this._isSelectAllCheckboxSelected =
      this._selectAllCheckbox?.checked ?? false;
    this.onSelectionChangeCallback(this._selectAllCheckbox, 'all');
  };

  onSelectionRowChange = (
    checkbox?: HdsFormCheckboxBaseSignature['Element'],
    selectionKey?: string
  ): void => {
    this.setSelectAllState();
    this.onSelectionChangeCallback(checkbox, selectionKey);
  };

  didInsertSelectAllCheckbox = (
    checkbox: HdsFormCheckboxBaseSignature['Element']
  ): void => {
    this._selectAllCheckbox = checkbox;
  };

  willDestroySelectAllCheckbox = (): void => {
    this._selectAllCheckbox = undefined;
  };

  didInsertRowCheckbox = (
    checkbox: HdsFormCheckboxBaseSignature['Element'],
    selectionKey?: string
  ): void => {
    if (selectionKey) {
      this._selectableRows.push({ selectionKey, checkbox });
    }
    this.setSelectAllState();
  };

  willDestroyRowCheckbox = (selectionKey?: string): void => {
    if (selectionKey === undefined) {
      return;
    }

    const index = this._selectableRows.findIndex(
      (row): boolean => row.selectionKey === selectionKey
    );

    if (index === -1) {
      return;
    }

    this._selectableRows.splice(index, 1);

    this.setSelectAllState();
  };

  setSelectAllState = (): void => {
    if (this._selectAllCheckbox) {
      const selectableRowsCount = this._selectableRows.length;
      const selectedRowsCount = this._selectableRows.filter(
        (row) => row.checkbox.checked
      ).length;

      this._selectAllCheckbox.checked =
        selectedRowsCount === selectableRowsCount;
      this._selectAllCheckbox.indeterminate =
        selectedRowsCount > 0 && selectedRowsCount < selectableRowsCount;
      this._isSelectAllCheckboxSelected = this._selectAllCheckbox.checked;
    }
  };

  <template>
    <table class={{this.classNames}} ...attributes>
      {{#if @columns}}
        <caption class="sr-only" aria-live="polite">{{@caption}}
          {{this.sortedMessageText}}</caption>
      {{else if @caption}}
        <caption class="sr-only">{{@caption}}</caption>
      {{/if}}

      <thead class="hds-table__thead">
        {{#if @columns}}
          <HdsTableTr
            @selectionScope="col"
            @onClickSortBySelected={{if
              @selectableColumnKey
              (fn this.setSortBy @selectableColumnKey)
            }}
            @sortBySelectedOrder={{if
              (eq this.sortBy @selectableColumnKey)
              this.sortOrder
            }}
            @isSelectable={{@isSelectable}}
            @onSelectionChange={{this.onSelectionAllChange}}
            @didInsert={{this.didInsertSelectAllCheckbox}}
            @willDestroy={{this.willDestroySelectAllCheckbox}}
            @selectionAriaLabelSuffix="all rows"
          >
            {{#each @columns as |column|}}
              {{#if column.isSortable}}
                <HdsTableThSort
                  @sortOrder={{if (eq column.key this.sortBy) this.sortOrder}}
                  @onClickSort={{fn this.setSortBy column.key}}
                  @align={{column.align}}
                  @width={{column.width}}
                  @tooltip={{column.tooltip}}
                >
                  {{column.label}}
                </HdsTableThSort>
              {{else}}
                <HdsTableTh
                  @align={{column.align}}
                  @width={{column.width}}
                  @tooltip={{column.tooltip}}
                  @isVisuallyHidden={{column.isVisuallyHidden}}
                >{{column.label}}</HdsTableTh>
              {{/if}}
            {{/each}}
          </HdsTableTr>
        {{else}}
          {{yield
            (hash
              Tr=(component
                HdsTableTr
                selectionScope="col"
                isSelectable=@isSelectable
                onSelectionChange=this.onSelectionAllChange
                didInsert=this.didInsertSelectAllCheckbox
                willDestroy=this.willDestroySelectAllCheckbox
                selectionAriaLabelSuffix="all rows"
                onClickSortBySelected=(if
                  @selectableColumnKey (fn this.setSortBy @selectableColumnKey)
                )
                sortBySelectedOrder=(if
                  (eq this.sortBy @selectableColumnKey) this.sortOrder
                )
              )
              Th=HdsTableTh
              ThSort=HdsTableThSort
              sortBy=this.sortBy
              sortOrder=this.sortOrder
              setSortBy=this.setSortBy
            )
            to="head"
          }}
        {{/if}}
      </thead>

      <tbody class="hds-table__tbody">
        {{#if @columns}}
          {{! -----------------------------------------------------------------
            IMPORTANT: we loop on the model array and for each record
            we yield the Tr/Td/Th elements _and_ the record itself as data
            this means the consumer will *have to* use the data key to access it in their template
          ----------------------------------------------------------------- }}
          {{! @glint-expect-error: [HDS-4380](https://hashicorp.atlassian.net/browse/HDS-4380) }}
          {{#let (sortBy this.getSortCriteria @model) as |sortedModel|}}
            {{#each sortedModel key=this.identityKey as |record index|}}
              {{yield
                (hash
                  Tr=(component
                    HdsTableTr
                    selectionScope="row"
                    isSelectable=@isSelectable
                    onSelectionChange=this.onSelectionRowChange
                    didInsert=this.didInsertRowCheckbox
                    willDestroy=this.willDestroyRowCheckbox
                    selectionAriaLabelSuffix=@selectionAriaLabelSuffix
                  )
                  Th=(component HdsTableTh scope="row")
                  Td=(component HdsTableTd align=@align)
                  data=record
                  rowIndex=index
                )
                to="body"
              }}
            {{/each}}
          {{/let}}
        {{else}}
          {{yield
            (hash
              Tr=(component
                HdsTableTr
                selectionScope="row"
                isSelectable=@isSelectable
                onSelectionChange=this.onSelectionRowChange
                didInsert=this.didInsertRowCheckbox
                willDestroy=this.willDestroyRowCheckbox
                selectionAriaLabelSuffix=@selectionAriaLabelSuffix
              )
              Th=(component HdsTableTh scope="row")
              Td=(component HdsTableTd align=@align)
              sortBy=this.sortBy
              sortOrder=this.sortOrder
            )
            to="body"
          }}
        {{/if}}
      </tbody>
    </table>
  </template>
}
