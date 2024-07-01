export declare enum HdsPaginationDirectionValues {
    Prev = "prev",
    Next = "next"
}
export type HdsPaginationDirections = `${HdsPaginationDirectionValues}`;
export interface HdsPaginationRouting {
    route?: string;
    model?: unknown;
    models?: unknown[];
    replace?: boolean;
    queryPages?: Record<string | number, unknown>;
    queryPrev?: Record<string, unknown>;
    queryNext?: Record<string, unknown>;
}
//# sourceMappingURL=types.d.ts.map