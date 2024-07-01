/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
type TextToCopy = string | number | bigint;
type TargetToCopy = HTMLElement;
export interface HdsClipboardModifierSignature {
    Element: HTMLElement;
    Args: {
        Named: {
            text?: TextToCopy;
            target?: TargetToCopy;
            onSuccess?: (...args: any[]) => void;
            onError?: (...args: any[]) => void;
        };
    };
}
export declare const getTextToCopy: (text: TextToCopy) => string;
export declare const getTargetElement: (target: string | Node) => HTMLElement | undefined;
export declare const getTextToCopyFromTargetElement: (targetElement: TargetToCopy) => string;
export declare const writeTextToClipboard: (textToCopy: string) => Promise<boolean>;
export declare const copyToClipboard: (text?: TextToCopy, target?: TargetToCopy) => Promise<boolean>;
declare const _default: import("ember-modifier").FunctionBasedModifier<{
    Element: HTMLElement;
    Args: {
        Named: {
            text?: TextToCopy | undefined;
            target?: HTMLElement | undefined;
            onSuccess?: ((...args: any[]) => void) | undefined;
            onError?: ((...args: any[]) => void) | undefined;
        };
        Positional: [];
    };
}>;
export default _default;
//# sourceMappingURL=hds-clipboard.d.ts.map