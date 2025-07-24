/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export declare function hdsSub([value, step]: [
    value: number,
    step?: number
]): string;
declare const hdsSubHelper: import("@ember/component/helper").FunctionBasedHelper<{
    Args: {
        Positional: [value: number, step?: number | undefined];
        Named: object;
    };
    Return: string;
}>;
export default hdsSubHelper;
