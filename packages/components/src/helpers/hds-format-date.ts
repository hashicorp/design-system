/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { helper } from '@ember/component/helper';

/*
 * This helper can be used to format a date with the provided options. The result of this helper is a date string.
 *
 * Example:
 * 
 * TODO: Below was revised in actual usage, update example later
 * ```hbs
 * {{hds-format-date
      @date
      month=@display.options.displayFormat.month
      day=@display.options.displayFormat.day
      year=@display.options.displayFormat.year
      hour=@display.options.displayFormat.hour
      minute=@display.options.displayFormat.minute
      second=@display.options.displayFormat.second
    }}
  * ```
 */

export function hdsFormatDate([date, month, day, year, hour, minute, second]: [
  Date,
  Intl.DateTimeFormatOptions['month'],
  Intl.DateTimeFormatOptions['day'],
  Intl.DateTimeFormatOptions['year'],
  Intl.DateTimeFormatOptions['hour'],
  Intl.DateTimeFormatOptions['minute'],
  Intl.DateTimeFormatOptions['second'],
  boolean,
]): string {
  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: month,
    day: day,
    year: year,
    hour: hour,
    minute: minute,
    second: second,
  }).format(date);
}

const hdsFormatDateHelper = helper(hdsFormatDate);
export default hdsFormatDateHelper;
