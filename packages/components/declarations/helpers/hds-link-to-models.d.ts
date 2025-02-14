/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export declare function hdsLinkToModels<T>([model, models]: [
    T | undefined,
    T[] | undefined
]): T[];
declare const hdsLinkToModelsHelper: abstract new <T>() => import("@ember/component/helper").FunctionBasedHelperInstance<{
    Args: {
        Positional: [T | undefined, T[] | undefined];
        Named: object;
    };
    Return: T[];
}>;
export default hdsLinkToModelsHelper;
//# sourceMappingURL=hds-link-to-models.d.ts.map