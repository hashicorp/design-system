/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsTextBodySignature } from '../text/body';
export interface HdsCodeEditorDescriptionSignature {
    Blocks: {
        default: [];
    };
    Element: HdsTextBodySignature['Element'];
}
declare const HdsCodeEditorDescription: import("@ember/component/template-only").TemplateOnlyComponent<HdsCodeEditorDescriptionSignature>;
export default HdsCodeEditorDescription;
//# sourceMappingURL=description.d.ts.map