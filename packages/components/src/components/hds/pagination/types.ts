type HdsPaginationPaginationDirection = 'next' | 'prev';

export type HdsPaginationPage = HdsPaginationPaginationDirection | number;

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
