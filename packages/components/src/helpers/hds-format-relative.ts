/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { helper } from '@ember/component/helper';

/*
 * This helper can be used to format dates relative to the current time.
 *
 * Example:
 *
 * ```hbs
 * ({{hds-format-relative @display.relative.value @display.relative.unit}})
 * ```
 */

export function hdsFormatRelative([value, unit]: [
  value: number,
  unit?: Intl.RelativeTimeFormatUnit,
]): string {
  if (unit) {
    return new Intl.RelativeTimeFormat(navigator.language).format(value, unit);
  } else {
    return new Intl.RelativeTimeFormat(navigator.language).format(value, 'day');
  }
}

const hdsFormatRelativeHelper = helper(hdsFormatRelative);
export default hdsFormatRelativeHelper;
