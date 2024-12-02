/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { DateTime } from 'luxon';
import { helper } from '@ember/component/helper';

/*
 * This helper can be used to format a date with the provided options. The result of this helper is a date string.
 *
 * Example:
 *
 * ```hbs
 * {{hds-format-date @date @display.options.displayFormat}}
 * ```
 */

export function hdsFormatDate([date, options]: [
  Date,
  {
    month: Intl.DateTimeFormatOptions['month'];
    day: Intl.DateTimeFormatOptions['day'];
    year?: Intl.DateTimeFormatOptions['year'];
    hour?: Intl.DateTimeFormatOptions['hour'];
    minute?: Intl.DateTimeFormatOptions['minute'];
    second?: Intl.DateTimeFormatOptions['second'];
  },
]): string {
  if (!date) {
    return '';
  }

  return DateTime.fromJSDate(date)
    .setLocale(navigator.language)
    .toLocaleString(options);
}

const hdsFormatDateHelper = helper(hdsFormatDate);
export default hdsFormatDateHelper;
