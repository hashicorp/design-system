/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
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