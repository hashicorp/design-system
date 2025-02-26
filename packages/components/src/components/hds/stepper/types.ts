/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsIconSignature } from '../icon';

export enum HdsStepperStatusesValues {
  Incomplete = 'incomplete',
  Progress = 'progress',
  Processing = 'processing',
  Complete = 'complete',
}

export type HdsStepperStatuses = `${HdsStepperStatusesValues}`;

export const HdsStepperStatusToIconsValues: Record<
  HdsStepperStatusesValues,
  HdsIconSignature['Args']['name']
> = {
  [HdsStepperStatusesValues.Incomplete]: 'circle',
  [HdsStepperStatusesValues.Progress]: 'circle-half',
  [HdsStepperStatusesValues.Processing]: 'loading',
  [HdsStepperStatusesValues.Complete]: 'check-circle',
};

export const HdsStepperStatusToSrOnlyText: Record<
  HdsStepperStatusesValues,
  string
> = {
  [HdsStepperStatusesValues.Incomplete]: '',
  [HdsStepperStatusesValues.Progress]: 'Current: ',
  [HdsStepperStatusesValues.Processing]: 'In progress: ',
  [HdsStepperStatusesValues.Complete]: 'Complete: ',
};

export enum HdsStepperTitleTagValues {
  Div = 'div',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

export type HdsStepperTitleTags = `${HdsStepperTitleTagValues}`;

export type HdsStepperNavigationStepIds = string[];

export interface HdsStepperNavigationStep {
  title: string;
  description?: string;
  isInteractive?: boolean;
  isComplete?: boolean;
}

export enum HdsStepperNavigationStatusesValues {
  Incomplete = 'incomplete',
  Active = 'active',
  Complete = 'complete',
}

export type HdsStepperNavigationStatuses =
  `${HdsStepperNavigationStatusesValues}`;

export const HdsStepperNavigationStatusToIndicatorStatus: Record<
  HdsStepperNavigationStatusesValues,
  HdsStepperStatusesValues
> = {
  [HdsStepperNavigationStatusesValues.Incomplete]:
    HdsStepperStatusesValues.Incomplete,
  [HdsStepperNavigationStatusesValues.Active]:
    HdsStepperStatusesValues.Progress,
  [HdsStepperNavigationStatusesValues.Complete]:
    HdsStepperStatusesValues.Complete,
};

export const HdsStepperNavigationStatusToSrOnlyText: Record<
  HdsStepperNavigationStatusesValues,
  string
> = {
  [HdsStepperNavigationStatusesValues.Incomplete]: '',
  [HdsStepperNavigationStatusesValues.Active]: 'Current: ',
  [HdsStepperNavigationStatusesValues.Complete]: 'Complete: ',
};

export type HdsStepperNavigationPanelIds = string[];

export type HdsStepperListStepIds = string[];

export interface HdsStepperListStep {
  title: string;
  description?: string;
  isComplete?: boolean;
}
