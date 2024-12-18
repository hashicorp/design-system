export default class TimeService extends Service {
    now: number;
    format(difference: any, display?: string): {
        options: any;
        difference: any;
        relative: {
            value: number;
            unit: any;
        };
    };
    formatTimeRelativeUnit(value: any, unit: any): {
        value: number;
        unit: any;
    };
    selectTimeRelativeUnit({ absValueInMs, valueInMs }: {
        absValueInMs: any;
        valueInMs: any;
    }, thresholds?: {
        second: number;
        minute: number;
        hour: number;
        day: number;
    }): {
        value: number;
        unit: any;
    };
    timeDifference(startDate: any, endDate: any): {
        absValueInMs: number;
        valueInMs: number;
    };
    register(id: any): () => void;
    unregister(id: any): boolean | undefined;
    start(): Generator<import("ember-concurrency").Yieldable<void>, void, unknown>;
    toIsoUtcString(date: any): string;
    get listeners(): Set<any>;
    #private;
}
import Service from '@ember/service';
//# sourceMappingURL=hds-time.d.ts.map