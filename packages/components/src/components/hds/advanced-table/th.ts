/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { focusable, type FocusableElement } from 'tabbable';
import { modifier } from 'ember-modifier';
import HdsAdvancedTableColumn from './models/column.ts';
import { onFocusTrapDeactivate } from '../../../modifiers/hds-advanced-table-cell/dom-management.ts';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.ts';

import type Owner from '@ember/owner';
import type {
  HdsAdvancedTableHorizontalAlignment,
  HdsAdvancedTableScope,
  HdsAdvancedTableExpandState,
} from './types.ts';
import type { HdsAdvancedTableSignature } from './index.ts';
import type { HdsAdvancedTableThResizeHandleSignature } from './th-resize-handle.ts';

export const ALIGNMENTS: string[] = Object.values(
  HdsAdvancedTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;

export interface HdsAdvancedTableThSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    column?: HdsAdvancedTableColumn;
    colspan?: number;
    depth?: number;
    hasExpandAllButton?: boolean;
    hasResizableColumns?: boolean;
    isExpanded?: HdsAdvancedTableExpandState;
    isExpandable?: boolean;
    isLastColumn?: boolean;
    isStickyColumn?: boolean;
    isStickyColumnPinned?: boolean;
    isVisuallyHidden?: boolean;
    newLabel?: string;
    previousColumn?: HdsAdvancedTableColumn;
    nextColumn?: HdsAdvancedTableColumn;
    parentId?: string;
    rowspan?: number;
    scope?: HdsAdvancedTableScope;
    tooltip?: string;
    tableHeight?: number;
    didInsertExpandButton?: (button: HTMLButtonElement) => void;
    onClickToggle?: () => void;
    onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
    willDestroyExpandButton?: (button: HTMLButtonElement) => void;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableTh extends Component<HdsAdvancedTableThSignature> {
  private _labelId = this.args.newLabel ? this.args.newLabel : guidFor(this);
  private _element!: HTMLDivElement;

  @tracked private _shouldTrapFocus = false;
  @tracked
  private _resizeHandleElement?: HdsAdvancedTableThResizeHandleSignature['Element'];

  constructor(owner: Owner, args: HdsAdvancedTableThSignature['Args']) {
    super(owner, args);

    const { rowspan, colspan, isStickyColumn } = args;

    if (isStickyColumn) {
      assert(
        'Cannot have custom rowspan or colspan if there are nested rows.',
        rowspan === undefined || colspan === undefined
      );
    }
  }

  get scope(): HdsAdvancedTableScope {
    const { scope = 'col' } = this.args;
    return scope;
  }

  get role(): string {
    if (this.scope === 'col') return 'columnheader';
    else return 'rowheader';
  }

  get align(): HdsAdvancedTableHorizontalAlignment {
    const { align = DEFAULT_ALIGN } = this.args;

    assert(
      `@align for "Hds::Table::Th" must be one of the following: ${ALIGNMENTS.join(
        ', '
      )}; received: ${align}`,
      ALIGNMENTS.includes(align)
    );

    return align;
  }

  // rowspan and colspan have to return 'auto' if not defined because otherwise the style modifier sets grid-area: undefined on the cell, which breaks the grid styles
  get rowspan(): string {
    if (this.args.rowspan) {
      return `span ${this.args.rowspan}`;
    }
    return 'auto';
  }

  get colspan(): string | undefined {
    if (this.args.colspan) {
      return `span ${this.args.colspan}`;
    }
    return 'auto';
  }

  get paddingLeft(): string | undefined {
    if (this.args.depth) {
      return `calc(${this.args.depth} * 32px + 16px)`;
    }
  }

  get classNames(): string {
    const classes = ['hds-advanced-table__th'];

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

  get showContextMenu(): boolean {
    const { hasResizableColumns } = this.args;

    return hasResizableColumns ?? false;
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

  private _manageExpandButton = modifier((button: HTMLButtonElement) => {
    const { didInsertExpandButton, willDestroyExpandButton } = this.args;
    if (typeof didInsertExpandButton === 'function') {
      didInsertExpandButton(button);
    }

    return () => {
      if (typeof willDestroyExpandButton === 'function') {
        willDestroyExpandButton(button);
      }
    };
  });
}
