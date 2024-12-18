/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsIconSignature } from '../icon';
export declare enum HdsAppFooterStatusValues {
    Operational = "operational",
    Degraded = "degraded",
    Maintenance = "maintenance",
    Outage = "outage"
}
export type HdsAppFooterStatusTypes = `${HdsAppFooterStatusValues}`;
export declare const HdsAppFooterStatusLinkStatusValues: Record<HdsAppFooterStatusValues, {
    text: string;
    iconName: HdsIconSignature['Args']['name'];
}>;
export declare enum HdsAppFooterThemeValues {
    Light = "light",
    Dark = "dark"
}
export type HdsAppFooterThemeTypes = `${HdsAppFooterThemeValues}`;
//# sourceMappingURL=types.d.ts.map