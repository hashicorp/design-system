/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsTextBodySignature } from '../text/body';
export interface HdsPageHeaderDescriptionSignature {
    Args: HdsTextBodySignature['Args'];
    Blocks: {
        default: [];
    };
    Element: HdsTextBodySignature['Element'];
}
declare const HdsPageHeaderDescription: import("@ember/component/template-only").TemplateOnlyComponent<HdsPageHeaderDescriptionSignature>;
export default HdsPageHeaderDescription;
//# sourceMappingURL=description.d.ts.map