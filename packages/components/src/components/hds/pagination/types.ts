export enum PaginationDirection {
  Prev = 'prev',
  Next = 'next',
}

export interface PaginationRouting {
  route?: string;
  model?: unknown;
  models?: unknown[];
  replace?: boolean;
  queryPages?: Record<string | number, unknown>;
  queryPrev?: Record<string, unknown>;
  queryNext?: Record<string, unknown>;
}
