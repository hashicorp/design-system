/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export type DefaultDisplayType = {
    displayFormat?: DisplayFormatType | null;
    showFriendly: boolean;
    showRelative: boolean;
    tooltipFormat?: DisplayFormatType | null;
};
export type DisplayFormatType = {
    month: string;
    day: string;
    year: string;
    hour?: string;
    minute?: string;
    second?: string;
    timeZoneName?: string;
};
export type DisplayType = {
    options?: DefaultDisplayType;
    difference: {
        absValueInMs: number;
        valueInMs: number;
    };
    relative: {
        value: number;
        unit: string;
    };
};
//# sourceMappingURL=hds-time-types.d.ts.map