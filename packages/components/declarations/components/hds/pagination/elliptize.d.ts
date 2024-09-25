import type { HdsPaginationElliptizedPageArray } from './types';
interface ElliptizeProps {
    pages: number[];
    current: number;
    limit?: number;
}
export declare const elliptize: ({ pages, current, limit, }: ElliptizeProps) => HdsPaginationElliptizedPageArray;
export {};
//# sourceMappingURL=elliptize.d.ts.map