export enum HdsPaginationDirectionValues {
  Prev = 'prev',
  Next = 'next',
}

export type HdsPaginationDirections = `${HdsPaginationDirectionValues}`;

export type HdsPaginationPage = HdsPaginationDirections | number;

export interface HdsPaginationRoutingArgs {
  route?: string;
  model?: unknown;
  models?: unknown[];
  replace?: boolean;
}
export interface HdsPaginationRouting extends HdsPaginationRoutingArgs {
  queryPages?: Record<string | number, unknown>;
  queryPrev?: Record<string, unknown>;
  queryNext?: Record<string, unknown>;
}
