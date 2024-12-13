/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type TimeService from '../../../services/hds-time';
export interface HdsTimeRangeSignature {
    Args: {
        startDate?: Date;
        endDate?: Date;
    };
    Element: HTMLElement;
}
export default class HdsTimeRange extends Component<HdsTimeRangeSignature> {
    readonly hdsTime: TimeService;
    get startDateIsoUtcString(): string | undefined;
    get endDateIsoUtcString(): string | undefined;
    get startDateDisplayFormat(): {
        month: Intl.DateTimeFormatOptions['month'];
        day: Intl.DateTimeFormatOptions['day'];
        year?: Intl.DateTimeFormatOptions['year'];
        hour?: Intl.DateTimeFormatOptions['hour'];
        minute?: Intl.DateTimeFormatOptions['minute'];
        second?: Intl.DateTimeFormatOptions['second'];
    };
    get endDateDisplayFormat(): {
        month: Intl.DateTimeFormatOptions['month'];
        day: Intl.DateTimeFormatOptions['day'];
        year?: Intl.DateTimeFormatOptions['year'];
        hour?: Intl.DateTimeFormatOptions['hour'];
        minute?: Intl.DateTimeFormatOptions['minute'];
        second?: Intl.DateTimeFormatOptions['second'];
    };
}
//# sourceMappingURL=range.d.ts.map