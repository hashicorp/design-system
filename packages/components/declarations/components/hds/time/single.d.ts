/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { DisplayType } from '../../../services/hds-time-types.ts';
export interface HdsTimeSingleSignature {
    Args: {
        date?: Date;
        display: DisplayType;
        isoUtcString?: string;
        register: () => void;
        unregister: () => void;
    };
    Element: HTMLTimeElement;
}
declare const HdsTimeSingleComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsTimeSingleSignature>;
export default HdsTimeSingleComponent;
//# sourceMappingURL=single.d.ts.map