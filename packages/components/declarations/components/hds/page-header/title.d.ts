/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsTextDisplaySignature } from '../text/display';
export interface HdsPageHeaderTitleSignature {
    Args: HdsTextDisplaySignature['Args'];
    Blocks: {
        default: [];
    };
    Element: HdsTextDisplaySignature['Element'];
}
declare const HdsPageHeaderTitle: import("@ember/component/template-only").TemplateOnlyComponent<HdsPageHeaderTitleSignature>;
export default HdsPageHeaderTitle;
//# sourceMappingURL=title.d.ts.map