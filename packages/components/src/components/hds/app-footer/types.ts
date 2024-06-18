/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';

export enum HdsAppFooterStatusValues {
  Operational = 'operational',
  Degraded = 'degraded',
  Maintenance = 'maintenance',
  Outage = 'outage',
}

export type HdsAppFooterStatusTypes = `${HdsAppFooterStatusValues}`;

export const HdsAppFooterStatusLinkStatusValues: Record<
  HdsAppFooterStatusValues,
  {
    text: string;
    iconName: FlightIconSignature['Args']['name'];
  }
> = {
  [HdsAppFooterStatusValues.Operational]: {
    text: 'System operational',
    iconName: 'check-circle',
  },
  [HdsAppFooterStatusValues.Degraded]: {
    text: 'System degraded',
    iconName: 'alert-triangle',
  },
  [HdsAppFooterStatusValues.Maintenance]: {
    text: 'System maintenance',
    iconName: 'alert-triangle',
  },
  [HdsAppFooterStatusValues.Outage]: {
    text: 'System outage',
    iconName: 'x-circle',
  },
};

export enum HdsAppFooterThemeValues {
  Light = 'light',
  Dark = 'dark',
}

export type HdsAppFooterThemeTypes = `${HdsAppFooterThemeValues}`;
