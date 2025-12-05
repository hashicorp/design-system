/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export type DefaultDisplayType = {
  displayFormat?: DisplayFormatType | null;
  showFriendly: boolean;
  showRelative: boolean;
  tooltipFormat?: DisplayFormatType | null;
};

export type DisplayFormatType = {
  month: Intl.DateTimeFormatOptions['month'];
  day: Intl.DateTimeFormatOptions['day'];
  year?: Intl.DateTimeFormatOptions['year'];
  hour?: Intl.DateTimeFormatOptions['hour'];
  minute?: Intl.DateTimeFormatOptions['minute'];
  second?: Intl.DateTimeFormatOptions['second'];
  timeZoneName?: string;
};

export type DisplayType = {
  options?: DefaultDisplayType;
  difference: { absValueInMs: number; valueInMs: number };
  relative: { value: number; unit?: Intl.RelativeTimeFormatUnit };
};
