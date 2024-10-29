/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export type DefaultDisplayType = {
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

export type DefaultDisplayMappingType = {
  [key: string]: DefaultDisplayType;
};
