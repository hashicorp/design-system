/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { TrackedMap } from 'tracked-built-ins';
import { hash } from '@ember/helper';
import { isPixelSize, measureColumnWidth, pixelToNumber } from '../utils.ts';

import type {
  HdsAdvancedTableNormalizedColumn,
  HdsAdvancedTablePixelString,
} from '../types.ts';
import type { ModifierLike } from '@glint/template';

export const DEFAULT_WIDTH = '1fr'; // default to '1fr' to allow flexible width
export const DEFAULT_MIN_WIDTH = '150px';
export const SUBPIXEL_TOLERANCE = 0.5;

type HdsAdvancedTableColumnWidth = HdsAdvancedTableNormalizedColumn['width'];

export interface HdsAdvancedTableSyncWidthValuesSignature {
  Element: HTMLDivElement;
}

interface HdsAdvancedTableColumnManagerWidthSignature {
  Args: {
    columnOrder: string[];
    columns: HdsAdvancedTableNormalizedColumn[];
    orderedColumns: HdsAdvancedTableNormalizedColumn[];
    thElements: TrackedMap<string, HTMLDivElement>;
    isSelectable?: boolean;
    getColumnByKey: (
      key: string
    ) => HdsAdvancedTableNormalizedColumn | undefined;
  };
  Blocks: {
    default: [
      {
        gridTemplateColumns: string;
        syncWidthValues: ModifierLike<HdsAdvancedTableSyncWidthValuesSignature>;
        beginColumnResize: () => void;
        resizeColumnByDelta: (
          columnKey: HdsAdvancedTableNormalizedColumn['key'],
          deltaPx: number
        ) => number;
        commitColumnWidths: () => void;
        getAppliedWidth: (
          columnKey: HdsAdvancedTableNormalizedColumn['key']
        ) => HdsAdvancedTableNormalizedColumn['width'];
        getRenderedWidth: (
          columnKey: HdsAdvancedTableNormalizedColumn['key']
        ) => HdsAdvancedTablePixelString | undefined;
        getSiblingColumnKeys: (
          columnKey: HdsAdvancedTableNormalizedColumn['key'] | null
        ) => {
          previous?: HdsAdvancedTableNormalizedColumn['key'];
          next?: HdsAdvancedTableNormalizedColumn['key'];
        };
        resetTransientColumnWidths: () => void;
        restoreColumnWidth: (
          columnKey: HdsAdvancedTableNormalizedColumn['key']
        ) => void;
      },
    ];
  };
}

export default class HdsAdvancedTableColumnManagerWidth extends Component<HdsAdvancedTableColumnManagerWidthSignature> {
  private _columnWidths = new TrackedMap<string, HdsAdvancedTableColumnWidth>();
  private _originalColumnWidths = new TrackedMap<
    string,
    HdsAdvancedTableColumnWidth
  >();
  private _transientColumnWidths = new TrackedMap<
    string,
    HdsAdvancedTablePixelString
  >();
  private _resizeStartWidths = new TrackedMap<string, number>();

  syncWidthValues = modifier<HdsAdvancedTableSyncWidthValuesSignature>(() => {
    const { columns } = this.args;

    for (const column of columns) {
      this._columnWidths.set(column.key, column.width ?? DEFAULT_WIDTH);
      this._originalColumnWidths.set(column.key, column.width ?? DEFAULT_WIDTH);
    }
  });

  get gridTemplateColumns(): string {
    const { isSelectable, orderedColumns } = this.args;

    let style = isSelectable ? 'min-content ' : '';

    for (const col of orderedColumns) {
      style += ` ${this._getColumnTrackSize(col)}`;
    }

    return style;
  }

  private _getColumnTrackSize(col: HdsAdvancedTableNormalizedColumn): string {
    const appliedWidth = this.getAppliedWidth(col.key) ?? DEFAULT_WIDTH;

    if (this._parseFrMultiplier(appliedWidth) !== undefined) {
      const minWidth = col.minWidth ?? DEFAULT_MIN_WIDTH;

      return `minmax(${minWidth}, ${appliedWidth})`;
    }

    return appliedWidth;
  }

  getAppliedWidth = (
    columnKey: HdsAdvancedTableNormalizedColumn['key']
  ): HdsAdvancedTableNormalizedColumn['width'] => {
    const width = this._columnWidths.get(columnKey);
    const transientWidth = this._transientColumnWidths.get(columnKey);

    return (
      transientWidth ??
      width ??
      `${this.args.thElements.get(columnKey)?.offsetWidth ?? 0}px`
    );
  };

  getSiblingColumnKeys = (
    columnKey: HdsAdvancedTableNormalizedColumn['key'] | null
  ): {
    previous?: HdsAdvancedTableNormalizedColumn['key'];
    next?: HdsAdvancedTableNormalizedColumn['key'];
  } => {
    if (columnKey === null) {
      return {};
    }

    const columnIndex = this.args.columnOrder.indexOf(columnKey);

    if (columnIndex === -1) {
      return {};
    }

    return {
      previous:
        columnIndex === 0 ? undefined : this.args.columnOrder[columnIndex - 1],
      next:
        columnIndex === this.args.columnOrder.length - 1
          ? undefined
          : this.args.columnOrder[columnIndex + 1],
    };
  };

  private _getPxWidth(key: string): number {
    const width = this._columnWidths.get(key);

    if (width !== undefined && isPixelSize(width)) {
      return pixelToNumber(width as `${number}px`);
    } else {
      return this.args.thElements.get(key)?.offsetWidth ?? 0;
    }
  }

  private _colMinPx(
    column: HdsAdvancedTableNormalizedColumn | undefined
  ): number {
    const minWidth = column?.minWidth ?? DEFAULT_MIN_WIDTH;

    return isPixelSize(minWidth) ? pixelToNumber(minWidth) : 0;
  }

  private _colMaxPx(
    column: HdsAdvancedTableNormalizedColumn | undefined
  ): number {
    const maxWidth = column?.maxWidth;

    return maxWidth !== undefined && isPixelSize(maxWidth)
      ? pixelToNumber(maxWidth)
      : Infinity;
  }

  beginColumnResize = (): void => {
    this._resizeStartWidths.clear();

    for (const key of this.args.columnOrder) {
      const pixelWidth = this._getPxWidth(key);

      this._resizeStartWidths.set(key, pixelWidth);
      this._transientColumnWidths.set(key, `${pixelWidth}px`);
    }
  };

  private _distributeWidthChange(keys: string[], amount: number): void {
    let remaining = amount;

    for (const key of keys) {
      const start = this._resizeStartWidths.get(key) ?? 0;
      const column = this.args.getColumnByKey(key);
      let applied = 0;

      if (remaining > 0) {
        applied = Math.min(
          remaining,
          Math.max(0, this._colMaxPx(column) - start)
        );
      } else if (remaining < 0) {
        applied = -Math.min(
          -remaining,
          Math.max(0, start - this._colMinPx(column))
        );
      }

      this._transientColumnWidths.set(key, `${start + applied}px`);
      remaining -= applied;
    }
  }

  private _distributableCapacity(keys: string[], grow: boolean): number {
    return keys.reduce((sum, key) => {
      const start = this._resizeStartWidths.get(key) ?? 0;
      const column = this.args.getColumnByKey(key);

      return (
        sum +
        (grow
          ? Math.max(0, this._colMaxPx(column) - start)
          : Math.max(0, start - this._colMinPx(column)))
      );
    }, 0);
  }

  resizeColumnByDelta = (
    columnKey: HdsAdvancedTableNormalizedColumn['key'],
    deltaPx: number
  ): number => {
    const order = this.args.columnOrder;
    const index = order.indexOf(columnKey);

    if (index === -1) {
      return 0;
    }

    const draggedKeys = [columnKey];
    // nearest-to-boundary first, so the cascade grows outward
    const rightKeys = order.slice(index + 1);

    let actualDelta: number;

    if (deltaPx > 0) {
      const capacity = Math.min(
        this._distributableCapacity(draggedKeys, true),
        this._distributableCapacity(rightKeys, false)
      );

      actualDelta = Math.max(0, Math.min(deltaPx, capacity));
    } else if (deltaPx < 0) {
      const capacity = Math.min(
        this._distributableCapacity(draggedKeys, false),
        this._distributableCapacity(rightKeys, true)
      );

      actualDelta = Math.min(0, -Math.min(-deltaPx, capacity));
    } else {
      actualDelta = 0;
    }

    this._distributeWidthChange(draggedKeys, actualDelta);
    this._distributeWidthChange(rightKeys, -actualDelta);

    return actualDelta;
  };

  commitColumnWidths = (): void => {
    const entries = this.args.columns.map((column) => {
      const startPixelWidth = this._resizeStartWidths.get(column.key);
      const transientWidth = this._transientColumnWidths.get(column.key);
      const pixelWidth =
        transientWidth !== undefined
          ? pixelToNumber(transientWidth)
          : this._getPxWidth(column.key);

      return {
        key: column.key,
        pixelWidth,
        startPixelWidth: startPixelWidth ?? pixelWidth,
        frMultiplier: this._parseFrMultiplier(
          this._columnWidths.get(column.key) ?? DEFAULT_WIDTH
        ),
        hasMoved:
          startPixelWidth !== undefined &&
          Math.abs(pixelWidth - startPixelWidth) > SUBPIXEL_TOLERANCE,
      };
    });

    const pxPerFrUnit = this._resolvePxPerFrUnit(entries);

    for (const entry of entries) {
      if (!entry.hasMoved) {
        continue;
      }

      if (entry.frMultiplier !== undefined && pxPerFrUnit > 0) {
        const weight = Math.max(
          0,
          entry.frMultiplier +
            (entry.pixelWidth - entry.startPixelWidth) / pxPerFrUnit
        );

        this._columnWidths.set(
          entry.key,
          `${Math.round(weight * 1e6) / 1e6}fr`
        );
      } else {
        this._columnWidths.set(entry.key, `${Math.round(entry.pixelWidth)}px`);
      }
    }
  };

  private _resolvePxPerFrUnit(
    entries: {
      startPixelWidth: number;
      frMultiplier: number | undefined;
    }[]
  ): number {
    const flexible = entries.filter(
      (entry) => entry.frMultiplier !== undefined && entry.frMultiplier > 0
    );

    const totalWeight = flexible.reduce(
      (sum, entry) => sum + (entry.frMultiplier ?? 0),
      0
    );
    const totalPixels = flexible.reduce(
      (sum, entry) => sum + entry.startPixelWidth,
      0
    );

    return totalWeight > 0 ? totalPixels / totalWeight : 0;
  }

  resetTransientColumnWidths = (): void => {
    this._transientColumnWidths.clear();
  };

  restoreColumnWidth = (
    columnKey: HdsAdvancedTableNormalizedColumn['key']
  ): void => {
    const originalWidth =
      this._originalColumnWidths.get(columnKey) ?? DEFAULT_WIDTH;

    this._transientColumnWidths.delete(columnKey);
    this._columnWidths.set(columnKey, originalWidth);
  };

  getRenderedWidth = (
    columnKey: HdsAdvancedTableNormalizedColumn['key']
  ): HdsAdvancedTablePixelString | undefined => {
    return measureColumnWidth(this.args.thElements.get(columnKey));
  };

  private _parseFrMultiplier(value: string): number | undefined {
    const match = /^(-?\d+(?:\.\d+)?)fr$/.exec(value);

    return match ? Number(match[1]) : undefined;
  }

  <template>
    {{yield
      (hash
        gridTemplateColumns=this.gridTemplateColumns
        syncWidthValues=this.syncWidthValues
        beginColumnResize=this.beginColumnResize
        resizeColumnByDelta=this.resizeColumnByDelta
        commitColumnWidths=this.commitColumnWidths
        getAppliedWidth=this.getAppliedWidth
        getSiblingColumnKeys=this.getSiblingColumnKeys
        getRenderedWidth=this.getRenderedWidth
        restoreColumnWidth=this.restoreColumnWidth
        resetTransientColumnWidths=this.resetTransientColumnWidths
      )
    }}
  </template>
}
