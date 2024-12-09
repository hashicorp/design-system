/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsTextBodySignature } from '../text/body';
export interface HdsCodeBlockDescriptionSignature {
    Blocks: {
        default: [];
    };
    Element: HdsTextBodySignature['Element'];
}
declare const HdsCodeBlockDescription: import("@ember/component/template-only").TemplateOnlyComponent<HdsCodeBlockDescriptionSignature>;
export default HdsCodeBlockDescription;
//# sourceMappingURL=description.d.ts.map