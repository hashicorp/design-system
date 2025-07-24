import type { HdsAdvancedTableModelItem } from './types';
export declare const getScrollIndicatorDimensions: (scrollWrapper: HTMLDivElement, theadElement: HTMLDivElement, hasStickyHeader: boolean, hasStickyFirstColumn: boolean) => {
    bottom: string;
    height: string;
    left: string;
    right: string;
    top: string;
    width: string;
};
export declare const getStickyColumnLeftOffset: (theadElement: HTMLDivElement, hasRowSelection: boolean) => string;
export declare const isEmberDataModel: (item: HdsAdvancedTableModelItem) => item is import("@ember-data/model").default;
//# sourceMappingURL=utils.d.ts.map