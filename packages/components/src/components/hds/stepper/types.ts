/**
 * Copyright IBM Corp. 2021, 2025
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
  [HdsStepperStatusesValues.Progress]: '(current)',
  [HdsStepperStatusesValues.Processing]: '(in progress)',
  [HdsStepperStatusesValues.Complete]: '(complete)',
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

export type HdsStepperNavStepIds = string[];

export interface HdsStepperNavStep {
  title: string;
  description?: string;
}

export enum HdsStepperNavStatusesValues {
  Incomplete = 'incomplete',
  Active = 'active',
  Complete = 'complete',
}

export type HdsStepperNavStatuses = `${HdsStepperNavStatusesValues}`;

export const HdsStepperNavStatusToIndicatorStatus: Record<
  HdsStepperNavStatusesValues,
  HdsStepperStatusesValues
> = {
  [HdsStepperNavStatusesValues.Incomplete]: HdsStepperStatusesValues.Incomplete,
  [HdsStepperNavStatusesValues.Active]: HdsStepperStatusesValues.Progress,
  [HdsStepperNavStatusesValues.Complete]: HdsStepperStatusesValues.Complete,
};

export const HdsStepperNavStatusToSrOnlyText: Record<
  HdsStepperNavStatusesValues,
  string
> = {
  [HdsStepperNavStatusesValues.Incomplete]: '',
  [HdsStepperNavStatusesValues.Active]: '(current)',
  [HdsStepperNavStatusesValues.Complete]: '(complete)',
};

export type HdsStepperNavPanelIds = string[];

export type HdsStepperListStepIds = string[];
