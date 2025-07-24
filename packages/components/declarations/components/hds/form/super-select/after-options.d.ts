/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export interface HdsFormSuperSelectAfterOptionsSignature {
    Args: {
        clearSelected: () => void;
        content?: string;
        resultCountMessage?: string;
        selectedCount?: string;
        showAll: () => void;
        showNoSelectedMessage?: boolean;
        showOnlySelected?: boolean;
        showSelected: () => void;
    };
}
declare const HdsFormSuperSelectAfterOptions: import("@ember/component/template-only").TemplateOnlyComponent<HdsFormSuperSelectAfterOptionsSignature>;
export default HdsFormSuperSelectAfterOptions;
