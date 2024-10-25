/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { typeOf } from '@ember/utils';
import { DateTime } from 'luxon';
import type { DefaultDisplayType, DefaultDisplayMappingType } from './types.ts';

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
const DISPLAY_KEY_FRIENDLY_RELATIVE = 'friendly-relative';

// returns 'Sep 5, 2018, 4:07:32 pm'
const DISPLAY_KEY_FRIENDLY_LOCAL = 'friendly-local';

// returns 'Sep 5, 2018'
const DISPLAY_KEY_FRIENDLY_ONLY = 'friendly-only';

// returns 'about 2 hours ago'
const DISPLAY_KEY_RELATIVE = 'relative';

// returns '2018-09-05T23:15:17345Z'
const DISPLAY_KEY_UTC = 'utc';

const FORMAT_PRECISION_SHORT_DATE = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
};
const FORMAT_PRECISION_MINUTE = {
  ...FORMAT_PRECISION_SHORT_DATE,
  hour: 'numeric',
  minute: 'numeric',
};
const FORMAT_PRECISION_SECOND = {
  ...FORMAT_PRECISION_SHORT_DATE,
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};
const DATE_DISPLAY_FORMATS = {
  [DISPLAY_KEY_FRIENDLY_LOCAL]: FORMAT_PRECISION_SECOND,
  [DISPLAY_KEY_FRIENDLY_ONLY]: FORMAT_PRECISION_SHORT_DATE,
};

const DEFAULT_DISPLAY = '';

const DEFAULT_DISPLAY_MAPPING: DefaultDisplayMappingType = {
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

export const DISPLAYS: string[] = [
  DISPLAY_KEY_FRIENDLY_RELATIVE,
  DISPLAY_KEY_FRIENDLY_LOCAL,
  DISPLAY_KEY_FRIENDLY_ONLY,
  DISPLAY_KEY_RELATIVE,
  DISPLAY_KEY_UTC,
];

export interface HdsTimeSignature {
  Args: {
    date: Date | string | undefined;
    display?: string;
    isOpen?: boolean;
    hasTooltip?: boolean;
  };
  Element: HTMLElement;
}

const dateIsValid = (date?: Date | string): date is Date =>
  date instanceof Date && !isNaN(+date);

export default class HdsTime extends Component<HdsTimeSignature> {
  now = Date.now();

  format(
    difference: { absValueInMs: number; valueInMs: number },
    display: string = DEFAULT_DISPLAY
  ): {
    options: DefaultDisplayType | undefined;
    difference: { absValueInMs: number; valueInMs: number };
    relative: { value: number; unit: string };
  } {
    let displayKey: string;

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

    const options = DEFAULT_DISPLAY_MAPPING[displayKey];

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
    thresholds = DEFAULT_RELATIVE_THRESHOLDS
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
    startDate: Date | number,
    endDate: Date | number
  ): { absValueInMs: number; valueInMs: number } {
    const valueInMs = Number(endDate) - Number(startDate);
    return {
      absValueInMs: Math.abs(valueInMs),
      valueInMs,
    };
  }

  get date(): string | Date | undefined {
    const { date } = this.args;

    // Sometimes an ISO date string might be passed in instead of a JS Date.
    if (typeOf(date) === 'string') {
      return new Date(date as string);
    }
    return date;
  }

  get isValid(): boolean {
    return dateIsValid(this.date);
  }

  get hasTooltip(): boolean {
    return this.args.hasTooltip ?? true;
  }

  get isoUtcString(): string {
    const date = this.date;

    // if (dateIsValid(date)) return this.time.toIsoUtcString(date);
    if (dateIsValid(date)) {
      return DateTime.fromJSDate(date).toUTC().toJSDate().toISOString();
    }
    return '';
  }

  get display(): {
    options: DefaultDisplayType | undefined;
    difference: { absValueInMs: number; valueInMs: number };
    relative: { value: number; unit: string };
  } {
    const date = this.date;
    const { display } = this.args;
    if (dateIsValid(date)) {
      const nextDiff = this.timeDifference(this.now, date);
      return this.format(nextDiff, display);
    }
    return {
      options: undefined,
      difference: { absValueInMs: 0, valueInMs: 0 },
      relative: { value: 0, unit: '' },
    };
  }

  get isOpen(): boolean {
    return this.args.isOpen ?? false;
  }
}
