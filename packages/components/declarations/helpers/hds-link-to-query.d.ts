/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export declare function hdsLinkToQuery([query]: [
    Record<string, unknown> | undefined
]): Record<string, unknown>;
declare const hdsLinkToQueryHelper: import("@ember/component/helper").FunctionBasedHelper<{
    Args: {
        Positional: [Record<string, unknown> | undefined];
        Named: object;
    };
    Return: Record<string, unknown>;
}>;
export default hdsLinkToQueryHelper;
