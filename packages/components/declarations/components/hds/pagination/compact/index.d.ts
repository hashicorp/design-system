/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsPaginationRoutingProps, HdsPaginationDirections } from '../types';
import type { HdsInteractiveSignature } from '../../interactive';
type HdsInteractiveQuery = HdsInteractiveSignature['Args']['query'];
type HdsPaginationCompactRoutingQueryProps = HdsPaginationRoutingProps & {
    queryNext?: HdsInteractiveQuery;
    queryPrev?: HdsInteractiveQuery;
};
type HdsPaginationQueryFunction = (page: HdsPaginationDirections, pageSize?: number) => HdsInteractiveQuery;
interface HdsPaginationCompactArgs extends HdsPaginationRoutingProps {
    ariaLabel?: string;
    showLabels?: boolean;
    isDisabledPrev?: boolean;
    isDisabledNext?: boolean;
    showSizeSelector?: boolean;
    sizeSelectorLabel?: string;
    pageSizes?: number[];
    currentPageSize?: number;
    queryFunction?: HdsPaginationQueryFunction;
    onPageChange?: (page: HdsPaginationDirections) => void;
    onPageSizeChange?: (pageSize: number) => void;
}
interface HdsPaginationCompactArgsControlledBase extends HdsPaginationCompactArgs {
    queryFunction: HdsPaginationQueryFunction;
}
interface HdsPaginationCompactArgsControlledWithModel extends HdsPaginationCompactArgsControlledBase {
    model: string | number;
}
interface HdsPaginationCompactArgsControlledWithModels extends HdsPaginationCompactArgsControlledBase {
    models: Array<string | number>;
}
interface HdsPaginationCompactArgsControlledWithRoute extends HdsPaginationCompactArgsControlledBase {
    route: string;
}
type HdsPaginationCompactArgsControlled = HdsPaginationCompactArgsControlledWithModel | HdsPaginationCompactArgsControlledWithModels | HdsPaginationCompactArgsControlledWithRoute;
interface HdsPaginationCompactArgsUncontrolled extends HdsPaginationCompactArgs {
    queryFunction?: undefined;
}
interface HdsPaginationCompactSignature {
    Args: HdsPaginationCompactArgsControlled | HdsPaginationCompactArgsUncontrolled;
    Element: HTMLDivElement;
}
export declare const DEFAULT_PAGE_SIZES: number[];
export default class HdsPaginationCompact extends Component<HdsPaginationCompactSignature> {
    _currentPageSize: number | undefined;
    isControlled: boolean;
    showLabels: boolean;
    showSizeSelector: boolean;
    constructor(owner: unknown, args: HdsPaginationCompactSignature['Args']);
    get ariaLabel(): string;
    get currentPageSize(): number | undefined;
    set currentPageSize(value: number | undefined);
    get pageSizes(): number[];
    buildQueryParamsObject(page: HdsPaginationDirections, pageSize?: number): HdsInteractiveQuery;
    get routing(): HdsPaginationCompactRoutingQueryProps;
    onPageChange(newPage: HdsPaginationDirections): void;
    onPageSizeChange(newPageSize: number): void;
}
export {};
//# sourceMappingURL=index.d.ts.map