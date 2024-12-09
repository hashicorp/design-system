/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export interface HdsRegisterEventSignature {
    Element: HTMLElement;
    Args: {
        Positional: [keyof ElementEventMap, EventListener];
        Named: {
            useCapture?: boolean;
        };
    };
}
declare const _default: import("ember-modifier").FunctionBasedModifier<{
    Element: HTMLElement;
    Args: {
        Named: {
            useCapture?: boolean | undefined;
        };
        Positional: [keyof ElementEventMap, EventListener];
    };
}>;
export default _default;
//# sourceMappingURL=hds-register-event.d.ts.map