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
//# sourceMappingURL=types.d.ts.map