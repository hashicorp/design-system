/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
import type { HdsInteractiveSignature } from '../../interactive';
export interface HdsSideNavListLinkSignature {
    Args: HdsInteractiveSignature['Args'] & {
        icon?: FlightIconSignature['Args']['name'];
        text?: string;
        badge?: string;
        count?: string;
        hasSubItems?: boolean;
        isActive?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: HdsInteractiveSignature['Element'];
}
declare const HdsSideNavListLinkComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsSideNavListLinkSignature>;
export default HdsSideNavListLinkComponent;
//# sourceMappingURL=link.d.ts.map