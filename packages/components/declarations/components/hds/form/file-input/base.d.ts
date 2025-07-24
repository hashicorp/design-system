/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export interface HdsFormFileInputBaseSignature {
    Args: {
        id?: string;
        ariaDescribedBy?: string;
    };
    Element: HTMLInputElement;
}
declare const HdsFormFileInputBase: import("@ember/component/template-only").TemplateOnlyComponent<HdsFormFileInputBaseSignature>;
export default HdsFormFileInputBase;
