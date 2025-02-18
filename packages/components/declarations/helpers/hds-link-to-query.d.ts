/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export declare function hdsLinkToQuery([query]: [
    Record<string, string> | undefined
]): Record<string, string>;
declare const hdsLinkToQueryHelper: import("@ember/component/helper").FunctionBasedHelper<{
    Args: {
        Positional: [Record<string, string> | undefined];
        Named: object;
    };
    Return: Record<string, string>;
}>;
export default hdsLinkToQueryHelper;
//# sourceMappingURL=hds-link-to-query.d.ts.map