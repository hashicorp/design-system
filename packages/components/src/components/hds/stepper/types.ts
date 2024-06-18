/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';

export enum HdsStepperStatusesValues {
  Incomplete = 'incomplete',
  Progress = 'progress',
  Processing = 'processing',
  Complete = 'complete',
}

export type HdsStepperStatuses = `${HdsStepperStatusesValues}`;

export const HdsStepperStatusToIconsValues: Record<
  HdsStepperStatusesValues,
  FlightIconSignature['Args']['name']
> = {
  [HdsStepperStatusesValues.Incomplete]: 'circle',
  [HdsStepperStatusesValues.Progress]: 'circle-half',
  [HdsStepperStatusesValues.Processing]: 'loading',
  [HdsStepperStatusesValues.Complete]: 'check-circle',
};
