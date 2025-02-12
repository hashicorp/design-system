import { DateTime } from 'luxon';
import { helper } from '@ember/component/helper';

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */


/*
 * This helper can be used to format a date with the provided options. The result of this helper is a date string.
 *
 * Example:
 *
 * ```hbs
 * {{hds-format-date @date @display.options.displayFormat}}
 * ```
 */

function hdsFormatDate([date, options]) {
  if (!date) {
    return '';
  }
  return DateTime.fromJSDate(date).setLocale(navigator.language).toLocaleString(options);
}
const hdsFormatDateHelper = helper(hdsFormatDate);

export { hdsFormatDateHelper as default, hdsFormatDate };
//# sourceMappingURL=hds-format-date.js.map
