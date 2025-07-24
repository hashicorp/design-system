/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export declare enum HdsLayoutGridAlignValues {
    Start = "start",
    Center = "center",
    End = "end",
    Stretch = "stretch"
}
export type HdsLayoutGridAligns = `${HdsLayoutGridAlignValues}`;
export declare enum HdsLayoutGridGapValues {
    'Zero' = "0",
    'Four' = "4",
    'Eight' = "8",
    'Twelve' = "12",
    'Sixteen' = "16",
    'TwentyFour' = "24",
    'ThirtyTwo' = "32",
    'FortyEight' = "48"
}
export type HdsLayoutGridGaps = `${HdsLayoutGridGapValues}`;
export type AvailableTagNames = keyof HTMLElementTagNameMap;
export type AvailableElements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
