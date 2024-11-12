import Service from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { DateTime } from 'luxon';
import { isTesting } from '@embroider/macros';
import type { TaskGenerator } from 'ember-concurrency';
import type {
  DisplayType,
  DefaultDisplayType,
  DisplayFormatType,
} from './hds-time-types.ts';

const MILLISECOND_IN_MS = 1;
const SECOND_IN_MS = 1000 * MILLISECOND_IN_MS;
const MINUTE_IN_MS = 60 * SECOND_IN_MS;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const WEEK_IN_MS = 7 * DAY_IN_MS;

const THRESHOLD_RELATIVE_TIME_IN_MS = WEEK_IN_MS;

const RELATIVE_UNIT_SECOND = 'second';
const RELATIVE_UNIT_HOUR = 'hour';
const RELATIVE_UNIT_MINUTE = 'minute';
const RELATIVE_UNIT_DAY = 'day';
const RELATIVE_UNIT_WEEK = 'week';

const DEFAULT_RELATIVE_THRESHOLDS = {
  [RELATIVE_UNIT_SECOND]: 1 * MINUTE_IN_MS,
  [RELATIVE_UNIT_MINUTE]: 1 * HOUR_IN_MS,
  [RELATIVE_UNIT_HOUR]: 1 * DAY_IN_MS,
  [RELATIVE_UNIT_DAY]: 100 * WEEK_IN_MS,
};

// returns 'Sep 5, 2018 (30 minutes ago)'
const DISPLAY_KEY_FRIENDLY_RELATIVE: string = 'friendly-relative';

// returns 'Sep 5, 2018, 4:07:32 pm'
const DISPLAY_KEY_FRIENDLY_LOCAL: string = 'friendly-local';

// returns 'Sep 5, 2018'
const DISPLAY_KEY_FRIENDLY_ONLY: string = 'friendly-only';

// returns 'about 2 hours ago'
const DISPLAY_KEY_RELATIVE: string = 'relative';

// returns '2018-09-05T23:15:17345Z'
const DISPLAY_KEY_UTC: string = 'utc';

const FORMAT_PRECISION_SHORT_DATE: DisplayFormatType = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
};
const FORMAT_PRECISION_MINUTE: DisplayFormatType = {
  ...FORMAT_PRECISION_SHORT_DATE,
  hour: 'numeric',
  minute: 'numeric',
};
const FORMAT_PRECISION_SECOND: DisplayFormatType = {
  ...FORMAT_PRECISION_SHORT_DATE,
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZoneName: 'short',
};
const DATE_DISPLAY_FORMATS: {
  [x: string]: DisplayFormatType;
} = {
  [DISPLAY_KEY_FRIENDLY_LOCAL]: FORMAT_PRECISION_SECOND,
  [DISPLAY_KEY_FRIENDLY_ONLY]: FORMAT_PRECISION_SHORT_DATE,
};

const DEFAULT_DISPLAY = '';

const DEFAULT_DISPLAY_MAPPING: {
  [x: string]: DefaultDisplayType;
} = {
  [DISPLAY_KEY_FRIENDLY_RELATIVE]: {
    displayFormat: FORMAT_PRECISION_SHORT_DATE,
    showFriendly: true,
    showRelative: true,
    tooltipFormat: FORMAT_PRECISION_SECOND,
  },
  [DISPLAY_KEY_FRIENDLY_LOCAL]: {
    displayFormat: DATE_DISPLAY_FORMATS[DISPLAY_KEY_FRIENDLY_LOCAL],
    showFriendly: true,
    showRelative: false,
    tooltipFormat: null,
  },
  [DISPLAY_KEY_FRIENDLY_ONLY]: {
    displayFormat: DATE_DISPLAY_FORMATS[DISPLAY_KEY_FRIENDLY_ONLY],
    showFriendly: true,
    showRelative: false,
    tooltipFormat: null,
  },
  [DISPLAY_KEY_RELATIVE]: {
    displayFormat: null,
    showFriendly: false,
    showRelative: true,
    tooltipFormat: FORMAT_PRECISION_MINUTE,
  },
  [DISPLAY_KEY_UTC]: {
    displayFormat: null,
    showFriendly: true,
    showRelative: false,
    tooltipFormat: null,
  },
};

const DISPLAY_SCALE = Object.keys(DEFAULT_DISPLAY_MAPPING);

export const DISPLAYS = [
  DISPLAY_KEY_FRIENDLY_RELATIVE,
  DISPLAY_KEY_FRIENDLY_LOCAL,
  DISPLAY_KEY_FRIENDLY_ONLY,
  DISPLAY_KEY_RELATIVE,
  DISPLAY_KEY_UTC,
];

export default class TimeService extends Service {
  #listeners = new Set<Date>();

  @tracked now = Date.now();

  format(
    difference: {
      absValueInMs: number;
      valueInMs: number;
    },
    display = DEFAULT_DISPLAY
  ): DisplayType {
    let displayKey;
    // If the scale display is defined and valid then set that display.
    if (display && DISPLAY_SCALE.includes(display)) {
      displayKey = display;
    } else {
      // If there's no defined display then we will execute the design system's
      // prefered algorithm.

      // By default, we assume we will display just a relative display only.
      displayKey = DISPLAY_KEY_RELATIVE;

      // If the difference in date is greater than the threshold for showing the
      // relative time then switch the display key.
      if (difference.absValueInMs > THRESHOLD_RELATIVE_TIME_IN_MS) {
        displayKey = DISPLAY_KEY_FRIENDLY_LOCAL;
      }
    }

    const options: DefaultDisplayType | undefined =
      DEFAULT_DISPLAY_MAPPING[displayKey];

    return {
      options,
      difference,
      relative: this.selectTimeRelativeUnit(difference),
    };
  }

  // Formats the value of a relative unit.
  formatTimeRelativeUnit(
    value: number,
    unit: string
  ): { value: number; unit: string } {
    return {
      value: Math.trunc(value),
      unit,
    };
  }

  // Selects an appropriate display format for the difference.
  selectTimeRelativeUnit(
    { absValueInMs, valueInMs }: { absValueInMs: number; valueInMs: number },
    thresholds: {
      second: number;
      minute: number;
      hour: number;
      day: number;
    } = DEFAULT_RELATIVE_THRESHOLDS
  ): { value: number; unit: string } {
    if (absValueInMs < thresholds[RELATIVE_UNIT_SECOND]) {
      return this.formatTimeRelativeUnit(
        valueInMs / SECOND_IN_MS,
        RELATIVE_UNIT_SECOND
      );
    }

    if (absValueInMs < thresholds[RELATIVE_UNIT_MINUTE]) {
      return this.formatTimeRelativeUnit(
        valueInMs / MINUTE_IN_MS,
        RELATIVE_UNIT_MINUTE
      );
    }

    if (absValueInMs < thresholds[RELATIVE_UNIT_HOUR]) {
      return this.formatTimeRelativeUnit(
        valueInMs / HOUR_IN_MS,
        RELATIVE_UNIT_HOUR
      );
    }

    if (absValueInMs < thresholds[RELATIVE_UNIT_DAY]) {
      return this.formatTimeRelativeUnit(
        valueInMs / DAY_IN_MS,
        RELATIVE_UNIT_DAY
      );
    }

    return this.formatTimeRelativeUnit(
      valueInMs / WEEK_IN_MS,
      RELATIVE_UNIT_WEEK
    );
  }

  // Gets the currently subscribed listeners.
  timeDifference(
    startDate: number,
    endDate: Date
  ): { absValueInMs: number; valueInMs: number } {
    const valueInMs = Number(endDate) - Number(startDate);
    return {
      absValueInMs: Math.abs(valueInMs),
      valueInMs,
    };
  }

  // Subscribes a listener to the ticking task for time changes.
  register(id: Date): () => void {
    this.#listeners.add(id);
    // @ts-expect-error - TS2339: Property 'perform' does not exist on type '() => TaskGenerator<string | undefined>'
    // note: we could potentially use taskFor via `ember-concurrency-ts` to avoid this exception
    this.start.perform();
    return (): void => {
      this.unregister(id);
    };
  }

  // Unregisters listener for the time task.
  unregister(id: Date): boolean {
    return this.#listeners.delete(id);
  }

  @task({ drop: true })
  *start(): TaskGenerator<string | undefined> {
    while (this.listeners.size) {
      this.now = Date.now();
      // When testing and canceling a EC task, a timer will never resolve and
      // cause the test to hang while waiting for a permanently hanging timeout.
      // This condition breaks the test out of that.
      // via: http://ember-concurrency.com/docs/testing-debugging/
      if (isTesting()) return;
      yield timeout(SECOND_IN_MS);
    }
  }

  // Transforms a JS date to a string representing the UTC ISO date.
  toIsoUtcString(date: Date): string | undefined {
    try {
      return DateTime.fromJSDate(date).toUTC().toJSDate().toISOString();
    } catch (error) {
      console.error('Error: Could not convert date to ISO UTC string; ', error);
    }
  }

  // Gets the currently subscribed listeners.
  get listeners(): Set<Date> {
    return this.#listeners;
  }
}
