/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
export interface HdsApplicationStateHeaderSignature {
    Args: {
        title?: string;
        errorCode?: string;
        icon?: FlightIconSignature['Args']['name'];
    };
    Element: HTMLDivElement;
}
declare const HdsApplicationStateHeaderComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsApplicationStateHeaderSignature>;
export default HdsApplicationStateHeaderComponent;
//# sourceMappingURL=header.d.ts.map