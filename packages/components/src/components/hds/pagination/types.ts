export type PaginationDirection = 'prev' | 'next';

export interface PaginationRouting {
  route?: string;
  model?: unknown;
  models?: unknown[];
  replace?: boolean;
  queryPages?: Record<string | number, unknown>;
  queryPrev?: Record<string, unknown>;
  queryNext?: Record<string, unknown>;
}
