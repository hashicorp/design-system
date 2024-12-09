import { helper } from '@ember/component/helper';

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */


/*
 * This helper can be used to format dates relative to the current time.
 *
 * Example:
 *
 * ```hbs
 * ({{hds-format-relative @display.relative.value @display.relative.unit}})
 * ```
 */

function hdsFormatRelative([value, unit]) {
  if (unit) {
    return new Intl.RelativeTimeFormat(navigator.language).format(value, unit);
  } else {
    return new Intl.RelativeTimeFormat(navigator.language).format(value, 'day');
  }
}
const hdsFormatRelativeHelper = helper(hdsFormatRelative);

export { hdsFormatRelativeHelper as default, hdsFormatRelative };
//# sourceMappingURL=hds-format-relative.js.map
