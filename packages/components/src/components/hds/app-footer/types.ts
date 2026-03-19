/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsIconSignature } from '../icon/index.gts';
import type HdsIntlService from '../../../services/hds-intl';

export enum HdsAppFooterStatusValues {
  Operational = 'operational',
  Degraded = 'degraded',
  Maintenance = 'maintenance',
  Outage = 'outage',
}

export type HdsAppFooterStatusTypes = `${HdsAppFooterStatusValues}`;

export function HdsAppFooterStatusLinkStatusValues(
  hdsIntl: HdsIntlService
): Record<
  HdsAppFooterStatusValues,
  {
    text: string;
    iconName: HdsIconSignature['Args']['name'];
  }
> {
  return {
    [HdsAppFooterStatusValues.Operational]: {
      text: hdsIntl.t('hds.appFooter.status.operational', {
        default: 'System operational',
      }),
      iconName: 'check-circle',
    },
    [HdsAppFooterStatusValues.Degraded]: {
      text: hdsIntl.t('hds.appFooter.status.degraded', {
        default: 'System degraded',
      }),
      iconName: 'alert-triangle',
    },
    [HdsAppFooterStatusValues.Maintenance]: {
      text: hdsIntl.t('hds.appFooter.status.maintenance', {
        default: 'System maintenance',
      }),
      iconName: 'alert-triangle',
    },
    [HdsAppFooterStatusValues.Outage]: {
      text: hdsIntl.t('hds.appFooter.status.outage', {
        default: 'System outage',
      }),
      iconName: 'x-circle',
    },
  };
}

export enum HdsAppFooterThemeValues {
  Light = 'light',
  Dark = 'dark',
}

export type HdsAppFooterThemeTypes = `${HdsAppFooterThemeValues}`;
