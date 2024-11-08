/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

type DefaultDisplayType = {
  displayFormat: {
    month: string;
    day: string;
    year: string;
    hour?: string;
    minute?: string;
    second?: string;
  } | null;
  showFriendly: boolean;
  showRelative: boolean;
  tooltipFormat: {
    month: string;
    day: string;
    year: string;
    hour: string;
    minute: string;
    second?: string;
  } | null;
};

export type DisplayType = {
  options: DefaultDisplayType | undefined;
  difference: { absValueInMs: number; valueInMs: number };
  relative: { value: number; unit: string };
};
