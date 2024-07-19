export enum HdsTableHorizontalAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum HdsTableThSortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum HdsTableThSortOrderLabels {
  Asc = 'ascending',
  Desc = 'descending',
}

export enum HdsTableThSortOrderIcons {
  ArrowUp = 'arrow-up',
  ArrowDown = 'arrow-down',
  SwapVertical = 'swap-vertical',
}

export enum HdsTableScopeValues {
  Row = 'row',
  Col = 'col',
}

export type HdsTableScope = `${HdsTableScopeValues}`;
