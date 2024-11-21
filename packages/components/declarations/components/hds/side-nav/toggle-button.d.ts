/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { HdsIconSignature } from '../icon';
export interface HdsSideNavToggleButtonSignature {
    Args: {
        icon: HdsIconSignature['Args']['name'];
    };
    Element: HTMLButtonElement;
}
declare const HdsSideNavToggleButton: import("@ember/component/template-only").TemplateOnlyComponent<HdsSideNavToggleButtonSignature>;
export default HdsSideNavToggleButton;
//# sourceMappingURL=toggle-button.d.ts.map