export const DEFAULT_PAGE_SIZES: number[];
export function elliptize({ pages, current, limit }: {
    pages: any;
    current: any;
    limit?: number | undefined;
}): any;
export default class HdsPaginationNumberedIndexComponent extends Component<any> {
    constructor(...args: any[]);
    _currentPage: any;
    _currentPageSize: any;
    isControlled: boolean;
    showInfo: any;
    showLabels: any;
    showSizeSelector: any;
    showPageNumbers: any;
    isTruncated: any;
    /**
     * @param ariaLabel
     * @type {string}
     * @default 'Pagination'
     */
    get ariaLabel(): string;
    set currentPage(value: any);
    get currentPage(): any;
    set currentPageSize(value: any);
    get currentPageSize(): any;
    /**
     * @param pageSizes
     * @type {array of numbers}
     * @description Set the page sizes users can select from.
     * @default [10, 30, 50]
     */
    get pageSizes(): array;
    get itemsRangeStart(): number;
    get itemsRangeEnd(): any;
    get pages(): any;
    get totalPages(): number;
    buildQueryParamsObject(page: any, pageSize: any): any;
    get routing(): {
        route: any;
        model: any;
        models: any;
        replace: any;
    };
    get isDisabledPrev(): boolean;
    get isDisabledNext(): boolean;
    onPageChange(page: any): void;
    onPageSizeChange(newPageSize: any): void;
}
import Component from '@glimmer/component';
//# sourceMappingURL=index.d.ts.map