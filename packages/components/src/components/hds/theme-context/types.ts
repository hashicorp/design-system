/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  HdsThemeValues,
  HdsModesLightValues,
  HdsModesDarkValues,
} from '../../../services/hds-theming.ts';

import type { HdsThemes, HdsModes } from '../../../services/hds-theming.ts';

// re-export the enum values for the `HdsThemes` to use in the component
// note: using `as const` ensures Object.values() returns only the values (not keys _and_ values)
export const HdsThemeContextThemesValues = {
  Default: HdsThemeValues.Default,
  System: HdsThemeValues.System,
  Light: HdsThemeValues.Light,
  Dark: HdsThemeValues.Dark,
} as const;

// re-export the enum values for the `HdsModes` to use in the component
// note: using `as const` ensures Object.values() returns only the values (not keys _and_ values)
export const HdsThemeContextModesValues = {
  CdsG0: HdsModesLightValues.CdsG0,
  CdsG10: HdsModesLightValues.CdsG10,
  CdsG90: HdsModesDarkValues.CdsG90,
  CdsG100: HdsModesDarkValues.CdsG100,
} as const;

export type HdsThemeContexts = HdsThemes | Exclude<HdsModes, 'default'>;
