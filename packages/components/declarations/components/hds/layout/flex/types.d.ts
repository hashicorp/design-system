/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export declare enum HdsLayoutFlexDirectionValues {
    Row = "row",
    Column = "column"
}
export type HdsLayoutFlexDirections = `${HdsLayoutFlexDirectionValues}`;
export declare enum HdsLayoutFlexJustifyValues {
    Start = "start",
    Center = "center",
    End = "end",
    SpaceBetween = "space-between",
    SpaceAround = "space-around",
    SpaceEvenly = "space-evenly"
}
export type HdsLayoutFlexJustifys = `${HdsLayoutFlexJustifyValues}`;
export declare enum HdsLayoutFlexAlignValues {
    Start = "start",
    Center = "center",
    End = "end",
    Stretch = "stretch"
}
export type HdsLayoutFlexAligns = `${HdsLayoutFlexAlignValues}`;
export declare enum HdsLayoutFlexGapValues {
    'Zero' = "0",
    'Four' = "4",
    'Eight' = "8",
    'Twelve' = "12",
    'Sixteen' = "16",
    'TwentyFour' = "24",
    'ThirtyTwo' = "32",
    'FortyEight' = "48"
}
export type HdsLayoutFlexGaps = `${HdsLayoutFlexGapValues}`;
export type AvailableTagNames = keyof HTMLElementTagNameMap;
export type AvailableElements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
