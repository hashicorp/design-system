/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsTextBodySignature } from '../../text/body';
export interface HdsFormErrorMessageSignature {
    Blocks: {
        default: [];
    };
    Element: HdsTextBodySignature['Element'];
}
declare const HdsFormErrorMessage: import("@ember/component/template-only").TemplateOnlyComponent<HdsFormErrorMessageSignature>;
export default HdsFormErrorMessage;
//# sourceMappingURL=message.d.ts.map