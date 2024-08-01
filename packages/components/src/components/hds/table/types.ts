export enum HdsTableHorizontalAlignmentValues {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}
export type HdsTableHorizontalAlignment =
  `${HdsTableHorizontalAlignmentValues}`;

export enum HdsTableThSortOrderValues {
  Asc = 'asc',
  Desc = 'desc',
}
export type HdsTableThSortOrder = `${HdsTableThSortOrderValues}`;

export enum HdsTableThSortOrderLabelValues {
  Asc = 'ascending',
  Desc = 'descending',
  None = 'none',
}
export type HdsTableThSortOrderLabels = `${HdsTableThSortOrderLabelValues}`;

export enum HdsTableThSortOrderIconValues {
  ArrowUp = 'arrow-up',
  ArrowDown = 'arrow-down',
  SwapVertical = 'swap-vertical',
}
export type HdsTableThSortOrderIcons = `${HdsTableThSortOrderIconValues}`;

export enum HdsTableScopeValues {
  Row = 'row',
  Col = 'col',
}

export type HdsTableScope = `${HdsTableScopeValues}`;
