/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
export interface HdsDialogPrimitiveFooterSignature {
    Args: {
        contextualClass?: string;
        onDismiss?: (event: MouseEvent, ...args: any[]) => void;
    };
    Blocks: {
        default: [
            {
                close?: (event: MouseEvent, ...args: any[]) => void;
            }
        ];
    };
    Element: HTMLDivElement;
}
declare const HdsDialogPrimitiveFooter: import("@ember/component/template-only").TemplateOnlyComponent<HdsDialogPrimitiveFooterSignature>;
export default HdsDialogPrimitiveFooter;
//# sourceMappingURL=footer.d.ts.map