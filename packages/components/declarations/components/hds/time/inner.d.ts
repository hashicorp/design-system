/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { DefaultDisplayType } from './types.ts';
export interface HdsTimeInnerSignature {
    Args: {
        isValid: boolean;
        date: unknown;
        displayInner: {
            options: DefaultDisplayType | undefined;
            difference: {
                absValueInMs: number;
                valueInMs: number;
            };
            relative: {
                value: number;
                unit: string;
            };
        };
        isoUtcString: string;
    };
    Element: HTMLTimeElement;
}
declare const HdsTimeInnerComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsTimeInnerSignature>;
export default HdsTimeInnerComponent;
//# sourceMappingURL=inner.d.ts.map