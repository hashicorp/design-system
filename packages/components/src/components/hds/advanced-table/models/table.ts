import HdsAdvancedTableRow from './row.ts';
import HdsAdvancedTableColumn from './column.ts';

import type { HdsAdvancedTableModel } from '../types';

interface HdsAdvancedTableTableArgs {
  model: HdsAdvancedTableModel;
  columns: HdsAdvancedTableColumn[];
  childrenKey?: string;
}

function getVisibleRows(rows: HdsAdvancedTableRow[]): HdsAdvancedTableRow[] {
  return rows.reduce((acc, row) => {
    acc.push(row);

    if (row.isExpanded && row.children) {
      acc.push(...getVisibleRows(row['children'] as HdsAdvancedTableRow[]));
    }

    return acc;
  }, [] as HdsAdvancedTableRow[]);
}

export default class HdsAdvancedTableTable {
  columns: HdsAdvancedTableColumn[];
  rows: HdsAdvancedTableRow[];

  get flattenedVisibleRows(): HdsAdvancedTableRow[] {
    return getVisibleRows(this.rows);
  }

  get allRowsExpanded(): boolean {
    return this.rows.every((row) => row.expandedState === true);
  }

  constructor(args: HdsAdvancedTableTableArgs) {
    const { model, columns, childrenKey } = args;

    this.columns = columns;
    this.rows = model.map((row) => {
      return new HdsAdvancedTableRow({ ...row, childrenKey });
    });
  }
}
