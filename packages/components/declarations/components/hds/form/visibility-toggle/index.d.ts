/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export interface HdsFormVisibilityToggleSignature {
    Args: {
        ariaLabel?: string;
        ariaMessageText?: string;
        isVisible?: boolean;
    };
    Element: HTMLButtonElement;
}
declare const HdsFormVisibilityToggle: import("@ember/component/template-only").TemplateOnlyComponent<HdsFormVisibilityToggleSignature>;
export default HdsFormVisibilityToggle;
//# sourceMappingURL=index.d.ts.map