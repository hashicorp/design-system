/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsPaginationPage, HdsPaginationRoutingProps, HdsPaginationElliptizedPageArray, HdsPaginationElliptizedPageArrayItem } from '../types';
import type { HdsInteractiveSignature } from '../../interactive/index.ts';
interface ElliptizeProps {
    pages: number[];
    current: number;
    limit?: number;
}
type HdsInteractiveQuery = HdsInteractiveSignature['Args']['query'];
type HdsPaginationNumberedRoutingQueryProps = HdsPaginationRoutingProps & {
    queryNext?: HdsInteractiveQuery;
    queryPrev?: HdsInteractiveQuery;
    queryPages?: Record<HdsPaginationElliptizedPageArrayItem, HdsInteractiveQuery>;
};
type HdsPaginationQueryFunction = (page: number, pageSize: number) => HdsInteractiveQuery;
interface HdsPaginationNumberedArgs extends HdsPaginationRoutingProps {
    ariaLabel?: string;
    totalItems: number;
    showLabels?: boolean;
    isTruncated?: boolean;
    currentPage?: number;
    showInfo?: boolean;
    showPageNumbers?: boolean;
    showTotalItems?: boolean;
    showSizeSelector?: boolean;
    sizeSelectorLabel?: string;
    pageSizes?: number[];
    currentPageSize?: number;
    queryFunction?: HdsPaginationQueryFunction;
    onPageChange?: (page: number, pageSize: number) => unknown;
    onPageSizeChange?: (pageSize: number) => unknown;
}
interface HdsPaginationNumberedArgsControlledBase extends HdsPaginationNumberedArgs {
    currentPage: number;
    currentPageSize: number;
    queryFunction: HdsPaginationQueryFunction;
}
interface HdsPaginationNumberedArgsControlledWithModel extends HdsPaginationNumberedArgsControlledBase {
    model: string | number;
}
interface HdsPaginationNumberedArgsControlledWithModels extends HdsPaginationNumberedArgsControlledBase {
    models: Array<string | number>;
}
interface HdsPaginationNumberedArgsControlledWithRoute extends HdsPaginationNumberedArgsControlledBase {
    route: string;
}
type HdsPaginationNumberedArgsControlled = HdsPaginationNumberedArgsControlledWithModel | HdsPaginationNumberedArgsControlledWithModels | HdsPaginationNumberedArgsControlledWithRoute;
interface HdsPaginationNumberedArgsUncontrolled extends HdsPaginationNumberedArgs {
    queryFunction?: undefined;
}
export interface HdsPaginationNumberedSignature {
    Args: HdsPaginationNumberedArgsControlled | HdsPaginationNumberedArgsUncontrolled;
    Element: HTMLDivElement;
}
export declare const DEFAULT_PAGE_SIZES: number[];
export declare const elliptize: ({ pages, current, limit, }: ElliptizeProps) => HdsPaginationElliptizedPageArray;
export default class HdsPaginationNumbered extends Component<HdsPaginationNumberedSignature> {
    private _currentPage;
    private _currentPageSize;
    private _isControlled;
    showInfo: boolean;
    showLabels: boolean;
    showSizeSelector: boolean;
    showPageNumbers: boolean;
    isTruncated: boolean;
    constructor(owner: unknown, args: HdsPaginationNumberedSignature['Args']);
    get ariaLabel(): string;
    get currentPage(): number;
    set currentPage(value: number);
    get currentPageSize(): number;
    set currentPageSize(value: number);
    get pageSizes(): number[];
    get itemsRangeStart(): number;
    get itemsRangeEnd(): number;
    get pages(): HdsPaginationElliptizedPageArray;
    get totalPages(): number;
    buildQueryParamsObject(page: HdsPaginationElliptizedPageArrayItem, pageSize: number): HdsInteractiveQuery;
    get routing(): HdsPaginationNumberedRoutingQueryProps;
    get isDisabledPrev(): boolean;
    get isDisabledNext(): boolean;
    onPageChange(page: HdsPaginationPage): void;
    onPageSizeChange(newPageSize: number): void;
    elliptizedPageArrayItemAsNumber: (item: HdsPaginationElliptizedPageArrayItem) => number;
    getPageNumberQuery(page: HdsPaginationElliptizedPageArrayItem): Record<string, unknown> | undefined;
}
export {};
//# sourceMappingURL=index.d.ts.map