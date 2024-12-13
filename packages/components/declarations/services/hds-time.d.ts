import Service from '@ember/service';
import type { TaskGenerator } from 'ember-concurrency';
import type { DisplayType, DefaultDisplayType, DisplayFormatType } from './hds-time-types.ts';
export declare const MILLISECOND_IN_MS = 1;
export declare const SECOND_IN_MS: number;
export declare const MINUTE_IN_MS: number;
export declare const HOUR_IN_MS: number;
export declare const DAY_IN_MS: number;
export declare const WEEK_IN_MS: number;
export declare const THRESHOLD_RELATIVE_TIME_IN_MS: number;
export declare enum HdsTimeRelativeUnitValues {
    Second = "second",
    Hour = "hour",
    Minute = "minute",
    Day = "day",
    Week = "week"
}
export declare const DEFAULT_RELATIVE_THRESHOLDS: {
    second: number;
    minute: number;
    hour: number;
    day: number;
};
export declare enum HdsDisplayKeyValues {
    FriendlyRelative = "friendly-relative",// Example: 'Sep 5, 2018 (30 minutes ago)'
    FriendlyLocal = "friendly-local",// Example: 'Sep 5, 2018, 4:07:32 pm'
    FriendlyOnly = "friendly-only",// Example: 'Sep 5, 2018'
    Relative = "relative",// Example: 'in 7 days'
    Utc = "utc"
}
export declare const FORMAT_PRECISION_SHORT_DATE: DisplayFormatType;
export declare const FORMAT_PRECISION_MINUTE: DisplayFormatType;
export declare const FORMAT_PRECISION_SECOND: DisplayFormatType;
export declare const DATE_DISPLAY_FORMATS: {
    [x: string]: DisplayFormatType;
};
export declare const DEFAULT_DISPLAY = "";
export declare const DEFAULT_DISPLAY_MAPPING: {
    [x: string]: DefaultDisplayType;
};
export declare const DISPLAY_SCALE: string[];
export declare const DISPLAYS: HdsDisplayKeyValues[];
export default class TimeService extends Service {
    #private;
    now: number;
    format(difference: {
        absValueInMs: number;
        valueInMs: number;
    }, display?: string): DisplayType;
    formatTimeRelativeUnit(value: number, unit: string): {
        value: number;
        unit: string;
    };
    selectTimeRelativeUnit({ absValueInMs, valueInMs }: {
        absValueInMs: number;
        valueInMs: number;
    }, thresholds?: {
        second: number;
        minute: number;
        hour: number;
        day: number;
    }): {
        value: number;
        unit: string;
    };
    timeDifference(startDate: number, endDate: Date): {
        absValueInMs: number;
        valueInMs: number;
    };
    register(id: Date): () => void;
    unregister(id: Date): boolean;
    start(): TaskGenerator<string | undefined>;
    toIsoUtcString(date: Date): string | undefined;
    get listeners(): Set<Date>;
}
//# sourceMappingURL=hds-time.d.ts.map