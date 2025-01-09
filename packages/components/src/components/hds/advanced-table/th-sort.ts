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

import {
  HdsAdvancedTableHorizontalAlignmentValues,
  HdsAdvancedTableThSortOrderValues,
  HdsAdvancedTableThSortOrderLabelValues,
} from './types.ts';
import type {
  HdsAdvancedTableHorizontalAlignment,
  HdsAdvancedTableThSortOrder,
  HdsAdvancedTableThSortOrderLabels,
} from './types.ts';
import type { HdsAdvancedTableThButtonSortSignature } from './th-button-sort';
import {
  didInsertGridCell,
  handleGridCellKeyPress,
  onFocusTrapDeactivate,
  updateTabbableChildren,
} from './helpers.ts';

export const ALIGNMENTS: string[] = Object.values(
  HdsAdvancedTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;

export interface HdsAdvancedTableThSortSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    onClickSort?: HdsAdvancedTableThButtonSortSignature['Args']['onClick'];
    sortOrder?: HdsAdvancedTableThSortOrder;
    tooltip?: string;
    rowspan?: number;
    colspan?: number;
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
  private _observer: MutationObserver | undefined = undefined;

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

  get classNames(): string {
    const classes = ['hds-advanced-table__th', 'hds-advanced-table__th--sort'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-advanced-table__th--align-${this.align}`);
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

  @action
  didInsert(element: HTMLDivElement): void {
    this._element = element;
    didInsertGridCell(element);
    element.addEventListener('keydown', (event: KeyboardEvent) => {
      handleGridCellKeyPress(event, this.enableFocusTrap);
    });

    this._observer = new MutationObserver(() => {
      updateTabbableChildren(this._element, this._shouldTrapFocus)
    })

    this._observer.observe(this._element, {
      childList: true,
      subtree: true
    });
  }

  @action willDestroy() {
    super.willDestroy();
    if (this._observer) {
      this._observer.disconnect();
    }
  }
}
