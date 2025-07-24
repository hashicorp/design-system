/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsTextBodySignature } from '../../text/body.ts';
export interface HdsFormHeaderDescriptionSignature {
    Blocks: {
        default: [];
    };
    Element: HdsTextBodySignature['Element'];
}
declare const HdsFormHeaderDescription: import("@ember/component/template-only").TemplateOnlyComponent<HdsFormHeaderDescriptionSignature>;
export default HdsFormHeaderDescription;
