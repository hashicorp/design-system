export const DEFAULT_PAGE_SIZES: number[];
export default class HdsPaginationCompactIndexComponent extends Component<any> {
    constructor(...args: any[]);
    _currentPageSize: any;
    isControlled: boolean;
    showLabels: any;
    showSizeSelector: any;
    /**
     * @param ariaLabel
     * @type {string}
     * @default 'Pagination'
     */
    get ariaLabel(): string;
    set currentPageSize(value: any);
    get currentPageSize(): any;
    /**
     * @param pageSizes
     * @type {array of numbers}
     * @description Set the page sizes users can select from.
     * @default [10, 30, 50]
     */
    get pageSizes(): array;
    buildQueryParamsObject(page: any, pageSize: any): any;
    get routing(): {
        route: any;
        model: any;
        models: any;
        replace: any;
    };
    onPageChange(newPage: any): void;
    currentPage: any;
    onPageSizeChange(newPageSize: any): void;
}
import Component from '@glimmer/component';
//# sourceMappingURL=index.d.ts.map