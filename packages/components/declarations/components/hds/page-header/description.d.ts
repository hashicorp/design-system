/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { HdsTextBodySignature } from '../text/body';
export interface HdsPageHeaderDescriptionSignature {
    Args: HdsTextBodySignature['Args'];
    Blocks: {
        default: [];
    };
    Element: HdsTextBodySignature['Element'];
}
declare const HdsPageHeaderDescriptionComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsPageHeaderDescriptionSignature>;
export default HdsPageHeaderDescriptionComponent;
//# sourceMappingURL=description.d.ts.map