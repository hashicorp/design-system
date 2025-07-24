/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsIconSignature } from '../icon';
export declare enum HdsStepperStatusesValues {
    Incomplete = "incomplete",
    Progress = "progress",
    Processing = "processing",
    Complete = "complete"
}
export type HdsStepperStatuses = `${HdsStepperStatusesValues}`;
export declare const HdsStepperStatusToIconsValues: Record<HdsStepperStatusesValues, HdsIconSignature['Args']['name']>;
export declare const HdsStepperStatusToSrOnlyText: Record<HdsStepperStatusesValues, string>;
export declare enum HdsStepperTitleTagValues {
    Div = "div",
    H1 = "h1",
    H2 = "h2",
    H3 = "h3",
    H4 = "h4",
    H5 = "h5",
    H6 = "h6"
}
export type HdsStepperTitleTags = `${HdsStepperTitleTagValues}`;
export type HdsStepperNavStepIds = string[];
export interface HdsStepperNavStep {
    title: string;
    description?: string;
}
export declare enum HdsStepperNavStatusesValues {
    Incomplete = "incomplete",
    Active = "active",
    Complete = "complete"
}
export type HdsStepperNavStatuses = `${HdsStepperNavStatusesValues}`;
export declare const HdsStepperNavStatusToIndicatorStatus: Record<HdsStepperNavStatusesValues, HdsStepperStatusesValues>;
export declare const HdsStepperNavStatusToSrOnlyText: Record<HdsStepperNavStatusesValues, string>;
export type HdsStepperNavPanelIds = string[];
export type HdsStepperListStepIds = string[];
