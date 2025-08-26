/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { focusable, type FocusableElement } from 'tabbable';
// @ts-expect-error: missing types
import focusTrap from 'ember-focus-trap/modifiers/focus-trap';

import { onFocusTrapDeactivate } from '../../../modifiers/hds-advanced-table-cell/dom-management.ts';
import {
  HdsAdvancedTableHorizontalAlignmentValues,
  HdsAdvancedTableThSortOrderLabelValues,
  HdsAdvancedTableThSortOrderValues,
} from './types.ts';

import { hash } from '@ember/helper';
import { and, not } from 'ember-truth-helpers';
import hdsAdvancedTableCell from '../../../modifiers/hds-advanced-table-cell.ts';
import HdsLayoutFlex from '../layout/flex/index.gts';
import type { HdsAdvancedTableSignature } from './index.ts';
import type { HdsAdvancedTableThButtonSortSignature } from './th-button-sort.gts';
import HdsAdvancedTableThButtonSort from './th-button-sort.gts';
import HdsAdvancedTableThButtonTooltip from './th-button-tooltip.gts';
import HdsAdvancedTableThContextMenu from './th-context-menu.gts';
import type { HdsAdvancedTableThResizeHandleSignature } from './th-resize-handle.gts';
import HdsAdvancedTableThResizeHandle from './th-resize-handle.gts';
import type { HdsAdvancedTableThSignature } from './th.gts';
import type {
  HdsAdvancedTableHorizontalAlignment,
  HdsAdvancedTableThSortOrder,
  HdsAdvancedTableThSortOrderLabels,
} from './types.ts';

export const ALIGNMENTS: string[] = Object.values(
  HdsAdvancedTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;

export interface HdsAdvancedTableThSortSignature {
  Args: {
    column?: HdsAdvancedTableThSignature['Args']['column'];
    align?: HdsAdvancedTableHorizontalAlignment;
    hasResizableColumns?: HdsAdvancedTableSignature['Args']['hasResizableColumns'];
    onClickSort?: HdsAdvancedTableThButtonSortSignature['Args']['onClick'];
    sortOrder?: HdsAdvancedTableThSortOrder;
    tooltip?: string;
    rowspan?: number;
    colspan?: number;
    tableHeight?: number;
    isStickyColumn?: boolean;
    isStickyColumnPinned?: boolean;
    onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
    onPinFirstColumn?: () => void;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableThSort extends Component<HdsAdvancedTableThSortSignature> {
  private _labelId = guidFor(this);
  private _element!: HTMLDivElement;

  @tracked private _shouldTrapFocus = false;
  @tracked
  private _resizeHandleElement?: HdsAdvancedTableThResizeHandleSignature['Element'];

  constructor(owner: Owner, args: HdsAdvancedTableThSortSignature['Args']) {
    super(owner, args);

    const { rowspan, colspan, isStickyColumn } = args;

    if (isStickyColumn) {
      assert(
        'Cannot have custom rowspan or colspan if there are nested rows.',
        rowspan === undefined || colspan === undefined
      );
    }
  }

  get ariaSort(): HdsAdvancedTableThSortOrderLabels {
    switch (this.args.sortOrder) {
      case HdsAdvancedTableThSortOrderValues.Asc:
        return HdsAdvancedTableThSortOrderLabelValues.Asc;
      case HdsAdvancedTableThSortOrderValues.Desc:
        return HdsAdvancedTableThSortOrderLabelValues.Desc;
      default:
        // none is the default per the spec.
        return HdsAdvancedTableThSortOrderLabelValues.None;
    }
  }

  get align(): HdsAdvancedTableHorizontalAlignment {
    const { align = DEFAULT_ALIGN } = this.args;

    assert(
      `@align for "Hds::Table" must be one of the following: ${ALIGNMENTS.join(
        ', '
      )}; received: ${align}`,
      ALIGNMENTS.includes(align)
    );
    return align;
  }

  get showContextMenu(): boolean {
    const { hasResizableColumns, isStickyColumn } = this.args;

    return (hasResizableColumns || isStickyColumn !== undefined) ?? false;
  }

  get classNames(): string {
    const classes = ['hds-advanced-table__th', 'hds-advanced-table__th--sort'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-advanced-table__th--align-${this.align}`);
    }

    if (this.args.isStickyColumn) {
      classes.push('hds-advanced-table__th--is-sticky-column');
    }

    if (this.args.isStickyColumn && this.args.isStickyColumnPinned) {
      classes.push('hds-advanced-table__th--is-sticky-column-pinned');
    }

    return classes.join(' ');
  }

  @action onFocusTrapDeactivate(): void {
    this._shouldTrapFocus = false;
    onFocusTrapDeactivate(this._element);
  }

  @action enableFocusTrap(): void {
    this._shouldTrapFocus = true;
  }

  @action getInitialFocus(): FocusableElement | undefined {
    const cellFocusableElements = focusable(this._element);
    return cellFocusableElements[0];
  }

  @action setElement(element: HTMLDivElement): void {
    this._element = element;
  }

  private _registerResizeHandleElement = modifier(
    (element: HdsAdvancedTableThResizeHandleSignature['Element']) => {
      this._resizeHandleElement = element;
    }
  );

  <template>
    <div
      class={{this.classNames}}
      aria-sort={{this.ariaSort}}
      role="columnheader"
      aria-rowspan={{@rowspan}}
      aria-colspan={{@colspan}}
      {{hdsAdvancedTableCell
        handleEnableFocusTrap=this.enableFocusTrap
        shouldTrapFocus=this._shouldTrapFocus
        setCellElement=this.setElement
      }}
      {{focusTrap
        isActive=this._shouldTrapFocus
        focusTrapOptions=(hash
          onDeactivate=this.onFocusTrapDeactivate
          initialFocus=this.getInitialFocus
          clickOutsideDeactivates=true
        )
      }}
      ...attributes
    >
      <HdsLayoutFlex @justify="space-between" @align="center" @gap="8">
        <div class="hds-advanced-table__th-content">
          <span
            id={{this._labelId}}
            class="hds-advanced-table__th-content-text hds-typography-body-200 hds-font-weight-semibold"
          >
            {{yield}}
          </span>

          {{#if @tooltip}}
            <HdsAdvancedTableThButtonTooltip
              @tooltip={{@tooltip}}
              @labelId={{this._labelId}}
            />
          {{/if}}
        </div>

        <HdsLayoutFlex
          class="hds-advanced-table__th-actions"
          @align="center"
          @gap="8"
        >
          <HdsAdvancedTableThButtonSort
            @sortOrder={{@sortOrder}}
            @onClick={{@onClickSort}}
            @labelId={{this._labelId}}
          />

          {{#if @column}}
            {{#if this.showContextMenu}}
              <HdsAdvancedTableThContextMenu
                @column={{@column}}
                @isStickyColumn={{@isStickyColumn}}
                @hasResizableColumns={{@hasResizableColumns}}
                @resizeHandleElement={{this._resizeHandleElement}}
                @onColumnResize={{@onColumnResize}}
                @onPinFirstColumn={{@onPinFirstColumn}}
              />
            {{/if}}

            {{#if (and @hasResizableColumns (not @column.isLast))}}
              <HdsAdvancedTableThResizeHandle
                @column={{@column}}
                @hasResizableColumns={{@hasResizableColumns}}
                @tableHeight={{@tableHeight}}
                @onColumnResize={{@onColumnResize}}
                {{this._registerResizeHandleElement}}
              />
            {{/if}}
          {{/if}}
        </HdsLayoutFlex>
      </HdsLayoutFlex>
    </div>
  </template>
}
