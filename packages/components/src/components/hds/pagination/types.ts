export enum HdsPaginationDirectionValues {
  Next = 'next',
  Prev = 'prev',
}

export type HdsPaginationDirections = `${HdsPaginationDirectionValues}`;

export type HdsPaginationPage = HdsPaginationDirections | number;

export enum HdsPaginationDirectionAriaLabelValues {
  Prev = 'Previous page',
  Next = 'Next page',
}

export type HdsPaginationDirectionAriaLabels =
  `${HdsPaginationDirectionAriaLabelValues}`;

export enum HdsPaginationDirectionLabelValues {
  Prev = 'Previous',
  Next = 'Next',
}

export type HdsPaginationDirectionLabels =
  `${HdsPaginationDirectionLabelValues}`;

export enum HdsPaginationDirectionIconValues {
  ChevronLeft = 'chevron-left',
  ChevronRight = 'chevron-right',
}

export type HdsPaginationDirectionIcons = `${HdsPaginationDirectionIconValues}`;

export type HdsPaginationElliptizedPageArrayItem = string | number;

export type HdsPaginationElliptizedPageArray =
  HdsPaginationElliptizedPageArrayItem[];

export interface HdsPaginationRoutingProps {
  route?: string;
  model?: unknown;
  models?: unknown[];
  replace?: boolean;
  queryByPage?: Record<string, unknown>;
  queryNext?: Record<string, unknown>;
  queryPrev?: Record<string, unknown>;
  queryPages?: Record<HdsPaginationElliptizedPageArrayItem, unknown>;
}
