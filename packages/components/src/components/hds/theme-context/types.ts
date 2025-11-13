/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  HdsThemeValues,
  HdsModesLightValues,
  HdsModesDarkValues,
} from '../../../services/hds-theming.ts';

export enum HdsContextualThemeValues {
  Default = HdsThemeValues.Default,
  System = HdsThemeValues.System,
  Light = HdsThemeValues.Light,
  Dark = HdsThemeValues.Dark,
  CdsG0 = HdsModesLightValues.CdsG0,
  CdsG10 = HdsModesLightValues.CdsG10,
  CdsG90 = HdsModesDarkValues.CdsG90,
  CdsG100 = HdsModesDarkValues.CdsG100,
}

export type HdsContextualThemes = `${HdsContextualThemeValues}`;
