/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export declare function hdsFormatRelative([value, unit]: [
    value: number,
    unit?: Intl.RelativeTimeFormatUnit
]): string;
declare const hdsFormatRelativeHelper: import("@ember/component/helper").FunctionBasedHelper<{
    Args: {
        Positional: [value: number, unit?: Intl.RelativeTimeFormatUnit | undefined];
        Named: object;
    };
    Return: string;
}>;
export default hdsFormatRelativeHelper;
