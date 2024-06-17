export interface PaginationRouting {
  route?: string;
  model?: unknown;
  models?: unknown[];
  replace?: boolean;
  queryPrev?: Record<string, unknown>;
  queryNext?: Record<string, unknown>;
}
