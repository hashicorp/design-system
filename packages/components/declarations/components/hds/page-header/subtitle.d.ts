/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsTextBodySignature } from '../text/body';
export interface HdsPageHeaderSubtitleSignature {
    Args: HdsTextBodySignature['Args'];
    Blocks: {
        default: [];
    };
    Element: HdsTextBodySignature['Element'];
}
declare const HdsPageHeaderSubtitle: import("@ember/component/template-only").TemplateOnlyComponent<HdsPageHeaderSubtitleSignature>;
export default HdsPageHeaderSubtitle;
//# sourceMappingURL=subtitle.d.ts.map