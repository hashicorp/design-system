/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export declare function hdsFormatDate([date, options]: [
    Date,
    {
        month: Intl.DateTimeFormatOptions['month'];
        day: Intl.DateTimeFormatOptions['day'];
        year?: Intl.DateTimeFormatOptions['year'];
        hour?: Intl.DateTimeFormatOptions['hour'];
        minute?: Intl.DateTimeFormatOptions['minute'];
        second?: Intl.DateTimeFormatOptions['second'];
    }
]): string;
declare const hdsFormatDateHelper: any;
export default hdsFormatDateHelper;
//# sourceMappingURL=hds-format-date.d.ts.map