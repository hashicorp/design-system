export declare const MILLISECOND_IN_MS = 1;
export declare const SECOND_IN_MS: number;
export declare const MINUTE_IN_MS: number;
export declare const HOUR_IN_MS: number;
export declare const DAY_IN_MS: number;
export declare const WEEK_IN_MS: number;
export declare const THRESHOLD_RELATIVE_TIME_IN_MS: number;
export declare const RELATIVE_UNIT_SECOND = "second";
export declare const RELATIVE_UNIT_HOUR = "hour";
export declare const RELATIVE_UNIT_MINUTE = "minute";
export declare const RELATIVE_UNIT_DAY = "day";
export declare const RELATIVE_UNIT_WEEK = "week";
export declare const DEFAULT_RELATIVE_THRESHOLDS: {
    second: number;
    minute: number;
    hour: number;
    day: number;
};
export declare const DISPLAY_KEY_FRIENDLY_RELATIVE = "friendly-relative";
export declare const DISPLAY_KEY_FRIENDLY_LOCAL = "friendly-local";
export declare const DISPLAY_KEY_FRIENDLY_ONLY = "friendly-only";
export declare const DISPLAY_KEY_RELATIVE = "relative";
export declare const DISPLAY_KEY_UTC = "utc";
export declare const FORMAT_PRECISION_SHORT_DATE: {
    month: string;
    day: string;
    year: string;
};
export declare const FORMAT_PRECISION_MINUTE: {
    hour: string;
    minute: string;
    month: string;
    day: string;
    year: string;
};
export declare const FORMAT_PRECISION_SECOND: {
    hour: string;
    minute: string;
    second: string;
    month: string;
    day: string;
    year: string;
};
export declare const DATE_DISPLAY_FORMATS: {
    "friendly-local": {
        hour: string;
        minute: string;
        second: string;
        month: string;
        day: string;
        year: string;
    };
    "friendly-only": {
        month: string;
        day: string;
        year: string;
    };
};
export declare const DEFAULT_DISPLAY = "";
export declare const DEFAULT_DISPLAY_MAPPING: {
    "friendly-relative": {
        displayFormat: {
            month: string;
            day: string;
            year: string;
        };
        showFriendly: boolean;
        showRelative: boolean;
        tooltipFormat: {
            hour: string;
            minute: string;
            second: string;
            month: string;
            day: string;
            year: string;
        };
    };
    "friendly-local": {
        displayFormat: {
            hour: string;
            minute: string;
            second: string;
            month: string;
            day: string;
            year: string;
        };
        showFriendly: boolean;
        showRelative: boolean;
        tooltipFormat: null;
    };
    "friendly-only": {
        displayFormat: {
            month: string;
            day: string;
            year: string;
        };
        showFriendly: boolean;
        showRelative: boolean;
        tooltipFormat: null;
    };
    relative: {
        displayFormat: null;
        showFriendly: boolean;
        showRelative: boolean;
        tooltipFormat: {
            hour: string;
            minute: string;
            month: string;
            day: string;
            year: string;
        };
    };
    utc: {
        displayFormat: null;
        showFriendly: boolean;
        showRelative: boolean;
        tooltipFormat: null;
    };
};
export declare const DISPLAY_SCALE: string[];
export declare const DISPLAYS: string[];
//# sourceMappingURL=hds-time-units.d.ts.map