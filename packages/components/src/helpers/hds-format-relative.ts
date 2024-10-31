/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { helper } from '@ember/component/helper';

/*
 * This helper can be used to format dates relative to the current time.
 *
 * Example:
 *
 * ```hbs
 * ({{hds-format-relative @display.relative.value unit=@display.relative.unit}})
 * ```
 */

export function hdsFormatRelative([value, unit]: [number, string]): string {
  if (unit) {
    return new Intl.RelativeTimeFormat('en', { style: 'short' }).format(
      value,
      unit as Intl.RelativeTimeFormatUnit
    );
  } else {
    return new Intl.RelativeTimeFormat('en', { style: 'short' }).format(
      value,
      'day'
    );
  }
}

const hdsFormatRelativeHelper = helper(hdsFormatRelative);
export default hdsFormatRelativeHelper;
