/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsIconSignature } from '../icon/index.gts';
import type HdsIntlService from '../../../services/hds-intl';

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

export function HdsStepperStatusToSrOnlyText(
  hdsIntl: HdsIntlService
): Record<HdsStepperStatusesValues, string> {
  return {
    [HdsStepperStatusesValues.Incomplete]: hdsIntl.t(
      'hds.stepper.status.incomplete',
      { default: '' }
    ),
    [HdsStepperStatusesValues.Progress]: hdsIntl.t(
      'hds.stepper.status.progress',
      { default: '(current)' }
    ),
    [HdsStepperStatusesValues.Processing]: hdsIntl.t(
      'hds.stepper.status.processing',
      { default: '(in progress)' }
    ),
    [HdsStepperStatusesValues.Complete]: hdsIntl.t(
      'hds.stepper.status.complete',
      { default: '(complete)' }
    ),
  };
}

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

export function HdsStepperNavStatusToSrOnlyText(
  hdsIntl: HdsIntlService
): Record<HdsStepperNavStatusesValues, string> {
  return {
    [HdsStepperNavStatusesValues.Incomplete]: hdsIntl.t(
      'hds.stepper.nav.incomplete',
      { default: '' }
    ),
    [HdsStepperNavStatusesValues.Active]: hdsIntl.t('hds.stepper.nav.active', {
      default: '(current)',
    }),
    [HdsStepperNavStatusesValues.Complete]: hdsIntl.t(
      'hds.stepper.nav.complete',
      { default: '(complete)' }
    ),
  };
}

export type HdsStepperNavPanelIds = string[];

export type HdsStepperListStepIds = string[];
