/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { TrackedMap } from 'tracked-built-ins';
import { hash } from '@ember/helper';
import {
  isPixelSize,
  measureColumnWidth,
  parsePixel,
  pixelToNumber,
} from '../utils.ts';

import type {
  HdsAdvancedTableNormalizedColumn,
  HdsAdvancedTablePixelString,
} from '../types.ts';
import type { ModifierLike } from '@glint/template';

export const DEFAULT_WIDTH = '1fr'; // default to '1fr' to allow flexible width
export const DEFAULT_MIN_WIDTH = '150px';
export const SUBPIXEL_TOLERANCE = 0.5;
// layout is measured in whole pixels (`offsetWidth`, `scrollWidth`)
const MEASUREMENT_TOLERANCE = 1;
// Chromium and WebKit lay out in 1/64px units, but serialize computed sizes
// with fewer digits, so measured track sizes are snapped back onto that grid
const LAYOUT_UNITS_PER_PX = 64;

const snapToLayoutUnit = (px: number): number =>
  Math.round(px * LAYOUT_UNITS_PER_PX) / LAYOUT_UNITS_PER_PX;

type HdsAdvancedTableColumnWidth = HdsAdvancedTableNormalizedColumn['width'];

export interface HdsAdvancedTableSyncWidthValuesSignature {
  Element: HTMLDivElement;
}

interface HdsAdvancedTableColumnManagerWidthSignature {
  Args: {
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
  private _resizedColumnFloors = new TrackedMap<string, number>();

  syncWidthValues = modifier<HdsAdvancedTableSyncWidthValuesSignature>(() => {
    const { columns } = this.args;

    for (const column of columns) {
      this._columnWidths.set(column.key, column.width ?? DEFAULT_WIDTH);
      this._originalColumnWidths.set(column.key, column.width ?? DEFAULT_WIDTH);
      this._resizedColumnFloors.delete(column.key);
    }
  });

  // the grid lays out its tracks in this order, which can differ from the
  // stored column order until it syncs (or for tables that can't reorder)
  private get _renderedColumnKeys(): string[] {
    return this.args.orderedColumns.map((column) => column.key);
  }

  get gridTemplateColumns(): string {
    const { isSelectable, orderedColumns } = this.args;

    let style = isSelectable ? 'min-content ' : '';

    for (const col of orderedColumns) {
      style += ` ${this._getGridTrack(col)}`;
    }

    return style;
  }

  // a plain `fr` track can't shrink below its content, so a resized column
  // would snap back on release; resized columns get an explicit floor instead
  private _getGridTrack(
    column: HdsAdvancedTableNormalizedColumn
  ): HdsAdvancedTableColumnWidth {
    const width = this.getAppliedWidth(column.key);
    const floor = this._resizedColumnFloors.get(column.key);

    if (width === undefined || isPixelSize(width) || floor === undefined) {
      return width;
    }

    return `minmax(${floor}px, ${width})`;
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

    const keys = this._renderedColumnKeys;
    const columnIndex = keys.indexOf(columnKey);

    if (columnIndex === -1) {
      return {};
    }

    return {
      previous: columnIndex === 0 ? undefined : keys[columnIndex - 1],
      next: columnIndex === keys.length - 1 ? undefined : keys[columnIndex + 1],
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

    const trackWidths = this._measureTrackWidths();

    for (const key of this._renderedColumnKeys) {
      const pixelWidth = trackWidths.get(key) ?? this._getPxWidth(key);

      this._resizeStartWidths.set(key, pixelWidth);
      this._transientColumnWidths.set(key, `${pixelWidth}px`);
    }
  };

  // `offsetWidth` rounds to whole pixels, so freezing flexible tracks at it
  // would shift every column when a resize starts and again when it ends;
  // resolved track sizes are exact and unaffected by transforms
  private _measureTrackWidths(): Map<string, number> {
    const grid = this._getGridElement();
    const columnKeys = this._renderedColumnKeys;

    if (grid === undefined) {
      return new Map();
    }

    const tracks = window
      .getComputedStyle(grid)
      .gridTemplateColumns.split(' ')
      .map((track) => parsePixel(track));
    // a selectable table has an extra leading track for the checkboxes
    const columnTracks = tracks.slice(tracks.length - columnKeys.length);

    if (columnTracks.length !== columnKeys.length) {
      return new Map();
    }

    return new Map(
      columnKeys.flatMap((key, index) => {
        const width = columnTracks[index];

        return width === undefined
          ? []
          : [[key, snapToLayoutUnit(width)] as const];
      })
    );
  }

  private _getGridElement(): HTMLElement | undefined {
    const [thElement] = this.args.thElements.values();
    const grid = thElement?.closest('.hds-advanced-table');

    return grid instanceof HTMLElement ? grid : undefined;
  }

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
    const order = this._renderedColumnKeys;
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
        column,
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

    if (!entries.some((entry) => entry.hasMoved)) {
      return;
    }

    const pxPerFrUnit = this._resolvePxPerFrUnit(entries);
    const isOverflowing = this._isTableOverflowing();
    // when only fixed columns moved, the space left for `fr` tracks is
    // unchanged, so the flexible columns keep their weights (and proportions)
    const hasFlexibleColumnMoved = entries.some(
      (entry) => entry.hasMoved && entry.frMultiplier !== undefined
    );

    for (const {
      column,
      pixelWidth,
      startPixelWidth,
      frMultiplier,
      hasMoved,
    } of entries) {
      const isFlexible = frMultiplier !== undefined && pxPerFrUnit > 0;

      if (isFlexible && hasFlexibleColumnMoved) {
        this._columnWidths.set(
          column.key,
          this._commitFrWidth(
            frMultiplier,
            startPixelWidth,
            pixelWidth,
            pxPerFrUnit
          )
        );
      }

      if (!hasMoved) {
        continue;
      }

      if (isFlexible) {
        const committedPx = Math.floor(pixelWidth);

        // an overflowing table leaves no free space for `fr` tracks, so they
        // render at their floor; otherwise a column that started below its
        // minimum keeps its resized width
        this._resizedColumnFloors.set(
          column.key,
          isOverflowing
            ? committedPx
            : Math.min(this._colMinPx(column), committedPx)
        );
      } else {
        this._columnWidths.set(column.key, `${Math.round(pixelWidth)}px`);
      }
    }
  };

  // a weight that matches its rendered width is shifted by the delta, so
  // measurement rounding can't drift untouched columns; a column pushed past
  // its share by its content is rederived from its width, or the grid would
  // redistribute it by weight and jump on release
  private _commitFrWidth(
    frMultiplier: number,
    startPixelWidth: number,
    pixelWidth: number,
    pxPerFrUnit: number
  ): HdsAdvancedTableColumnWidth {
    const isProportional =
      Math.abs(frMultiplier * pxPerFrUnit - startPixelWidth) <=
      MEASUREMENT_TOLERANCE;
    const weight = isProportional
      ? frMultiplier + (pixelWidth - startPixelWidth) / pxPerFrUnit
      : pixelWidth / pxPerFrUnit;

    return `${Math.round(Math.max(0, weight) * 1e6) / 1e6}fr`;
  }

  // a resize moves width between columns without changing the total, so the
  // table overflows after the commit exactly when it did before; the header
  // spans every track, unlike `scrollWidth`, which also counts cell content
  // spilling past the last column
  private _isTableOverflowing(): boolean {
    const scroller = this._getGridElement();
    const [thElement] = this.args.thElements.values();
    const thead = thElement?.closest('.hds-advanced-table__thead');

    if (scroller === undefined || !(thead instanceof HTMLElement)) {
      return false;
    }

    return thead.offsetWidth - scroller.clientWidth > MEASUREMENT_TOLERANCE;
  }

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
    this._resizedColumnFloors.delete(columnKey);
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
