/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export { iconNames as HdsIconNames } from '@hashicorp/flight-icons/svg';

export enum HdsIconSizeValues {
  Sixteen = '16',
  TwentyFour = '24',
}

export type HdsIconSizes = `${HdsIconSizeValues}`;

export enum HdsIconColorValues {
  Primary = 'primary',
  Strong = 'strong',
  Faint = 'faint',
  Disabled = 'disabled',
  HighContrast = 'high-contrast',
  Action = 'action',
  ActionHover = 'action-hover',
  ActionActive = 'action-active',
  Highlight = 'highlight',
  HighlightOnSurface = 'highlight-on-surface',
  HighlightHighContrast = 'highlight-high-contrast',
  Success = 'success',
  SuccessOnSurface = 'success-on-surface',
  SuccessHighContrast = 'success-high-contrast',
  Warning = 'warning',
  WarningOnSurface = 'warning-on-surface',
  WarningHighContrast = 'warning-high-contrast',
  Critical = 'critical',
  CriticalOnSurface = 'critical-on-surface',
  CriticalHighContrast = 'critical-high-contrast',
}
export type HdsIconColors = `${HdsIconColorValues}`;
