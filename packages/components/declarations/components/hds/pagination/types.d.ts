/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsInteractiveSignature } from '../interactive';
export declare enum HdsPaginationDirectionValues {
    Next = "next",
    Prev = "prev"
}
export type HdsPaginationDirections = `${HdsPaginationDirectionValues}`;
export type HdsPaginationPage = HdsPaginationDirections | number;
export declare enum HdsPaginationDirectionAriaLabelValues {
    Prev = "Previous page",
    Next = "Next page"
}
export type HdsPaginationDirectionAriaLabels = `${HdsPaginationDirectionAriaLabelValues}`;
export declare enum HdsPaginationDirectionLabelValues {
    Prev = "Previous",
    Next = "Next"
}
export type HdsPaginationDirectionLabels = `${HdsPaginationDirectionLabelValues}`;
export type HdsPaginationElliptizedPageArrayItem = string | number;
export type HdsPaginationElliptizedPageArray = HdsPaginationElliptizedPageArrayItem[];
export type HdsPaginationRoutingProps = Pick<HdsInteractiveSignature['Args'], 'route' | 'model' | 'models' | 'replace'>;
//# sourceMappingURL=types.d.ts.map