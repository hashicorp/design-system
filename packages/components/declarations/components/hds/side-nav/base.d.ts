/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export interface HdsSideNavBaseSignature {
    Blocks: {
        root?: any;
        header?: any;
        body?: any;
        footer?: any;
    };
    Element: HTMLDivElement;
}
declare const HdsSideNavBase: import("@ember/component/template-only").TemplateOnlyComponent<HdsSideNavBaseSignature>;
export default HdsSideNavBase;
//# sourceMappingURL=base.d.ts.map