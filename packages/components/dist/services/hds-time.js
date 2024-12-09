import { _ as _applyDecoratedDescriptor, e as _classPrivateFieldInitSpec, b as _initializerDefineProperty, f as _classPrivateFieldGet2 } from '../_rollupPluginBabelHelpers-81503waH.js';
import Service from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { DateTime } from 'luxon';
import { isTesting } from '@embroider/macros';

var _dec, _class, _descriptor, _listeners;
const MILLISECOND_IN_MS = 1;
const SECOND_IN_MS = 1000 * MILLISECOND_IN_MS;
const MINUTE_IN_MS = 60 * SECOND_IN_MS;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const WEEK_IN_MS = 7 * DAY_IN_MS;
const THRESHOLD_RELATIVE_TIME_IN_MS = WEEK_IN_MS;
let HdsTimeRelativeUnitValues = /*#__PURE__*/function (HdsTimeRelativeUnitValues) {
  HdsTimeRelativeUnitValues["Second"] = "second";
  HdsTimeRelativeUnitValues["Hour"] = "hour";
  HdsTimeRelativeUnitValues["Minute"] = "minute";
  HdsTimeRelativeUnitValues["Day"] = "day";
  HdsTimeRelativeUnitValues["Week"] = "week";
  return HdsTimeRelativeUnitValues;
}({});
const DEFAULT_RELATIVE_THRESHOLDS = {
  [HdsTimeRelativeUnitValues.Second]: 1 * MINUTE_IN_MS,
  [HdsTimeRelativeUnitValues.Minute]: 1 * HOUR_IN_MS,
  [HdsTimeRelativeUnitValues.Hour]: 1 * DAY_IN_MS,
  [HdsTimeRelativeUnitValues.Day]: 100 * WEEK_IN_MS
};
let HdsDisplayKeyValues = /*#__PURE__*/function (HdsDisplayKeyValues) {
  HdsDisplayKeyValues["FriendlyRelative"] = "friendly-relative";
  HdsDisplayKeyValues["FriendlyLocal"] = "friendly-local";
  HdsDisplayKeyValues["FriendlyOnly"] = "friendly-only";
  HdsDisplayKeyValues["Relative"] = "relative";
  HdsDisplayKeyValues["Utc"] = "utc";
  return HdsDisplayKeyValues;
}({}); // Example: '2018-09-05T23:15:17345Z'
const FORMAT_PRECISION_SHORT_DATE = {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
};
const FORMAT_PRECISION_MINUTE = {
  ...FORMAT_PRECISION_SHORT_DATE,
  hour: 'numeric',
  minute: 'numeric'
};
const FORMAT_PRECISION_SECOND = {
  ...FORMAT_PRECISION_SHORT_DATE,
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZoneName: 'short'
};
const DATE_DISPLAY_FORMATS = {
  [HdsDisplayKeyValues.FriendlyLocal]: FORMAT_PRECISION_SECOND,
  [HdsDisplayKeyValues.FriendlyOnly]: FORMAT_PRECISION_SHORT_DATE
};
const DEFAULT_DISPLAY = '';
const DEFAULT_DISPLAY_MAPPING = {
  [HdsDisplayKeyValues.FriendlyRelative]: {
    displayFormat: FORMAT_PRECISION_SHORT_DATE,
    showFriendly: true,
    showRelative: true,
    tooltipFormat: FORMAT_PRECISION_SECOND
  },
  [HdsDisplayKeyValues.FriendlyLocal]: {
    displayFormat: DATE_DISPLAY_FORMATS[HdsDisplayKeyValues.FriendlyLocal],
    showFriendly: true,
    showRelative: false,
    tooltipFormat: null
  },
  [HdsDisplayKeyValues.FriendlyOnly]: {
    displayFormat: DATE_DISPLAY_FORMATS[HdsDisplayKeyValues.FriendlyOnly],
    showFriendly: true,
    showRelative: false,
    tooltipFormat: null
  },
  [HdsDisplayKeyValues.Relative]: {
    displayFormat: null,
    showFriendly: false,
    showRelative: true,
    tooltipFormat: FORMAT_PRECISION_MINUTE
  },
  [HdsDisplayKeyValues.Utc]: {
    displayFormat: null,
    showFriendly: true,
    showRelative: false,
    tooltipFormat: null
  }
};
const DISPLAY_SCALE = Object.keys(DEFAULT_DISPLAY_MAPPING);
const DISPLAYS = [HdsDisplayKeyValues.FriendlyRelative, HdsDisplayKeyValues.FriendlyLocal, HdsDisplayKeyValues.FriendlyOnly, HdsDisplayKeyValues.Relative, HdsDisplayKeyValues.Utc];
let TimeService = (_dec = task({
  drop: true
}), _class = (_listeners = /*#__PURE__*/new WeakMap(), class TimeService extends Service {
  constructor(...args) {
    super(...args);
    _classPrivateFieldInitSpec(this, _listeners, new Set());
    _initializerDefineProperty(this, "now", _descriptor, this);
  }
  format(difference, display = DEFAULT_DISPLAY) {
    let displayKey;
    // If the scale display is defined and valid then set that display.
    if (display && DISPLAY_SCALE.includes(display)) {
      displayKey = display;
    } else {
      // If there's no defined display then we will execute the design system's
      // prefered algorithm.

      // By default, we assume we will display just a relative display only.
      displayKey = HdsDisplayKeyValues.Relative;

      // If the difference in date is greater than the threshold for showing the
      // relative time then switch the display key.
      if (difference.absValueInMs > THRESHOLD_RELATIVE_TIME_IN_MS) {
        displayKey = HdsDisplayKeyValues.FriendlyLocal;
      }
    }
    const options = DEFAULT_DISPLAY_MAPPING[displayKey];
    return {
      options,
      difference,
      relative: this.selectTimeRelativeUnit(difference)
    };
  }

  // Formats the value of a relative unit.
  formatTimeRelativeUnit(value, unit) {
    return {
      value: Math.trunc(value),
      unit
    };
  }

  // Selects an appropriate display format for the difference.
  selectTimeRelativeUnit({
    absValueInMs,
    valueInMs
  }, thresholds = DEFAULT_RELATIVE_THRESHOLDS) {
    if (absValueInMs < thresholds[HdsTimeRelativeUnitValues.Second]) {
      return this.formatTimeRelativeUnit(valueInMs / SECOND_IN_MS, HdsTimeRelativeUnitValues.Second);
    }
    if (absValueInMs < thresholds[HdsTimeRelativeUnitValues.Minute]) {
      return this.formatTimeRelativeUnit(valueInMs / MINUTE_IN_MS, HdsTimeRelativeUnitValues.Minute);
    }
    if (absValueInMs < thresholds[HdsTimeRelativeUnitValues.Hour]) {
      return this.formatTimeRelativeUnit(valueInMs / HOUR_IN_MS, HdsTimeRelativeUnitValues.Hour);
    }
    if (absValueInMs < thresholds[HdsTimeRelativeUnitValues.Day]) {
      return this.formatTimeRelativeUnit(valueInMs / DAY_IN_MS, HdsTimeRelativeUnitValues.Day);
    }
    return this.formatTimeRelativeUnit(valueInMs / WEEK_IN_MS, HdsTimeRelativeUnitValues.Week);
  }

  // Gets the currently subscribed listeners.
  timeDifference(startDate, endDate) {
    const valueInMs = Number(endDate) - Number(startDate);
    return {
      absValueInMs: Math.abs(valueInMs),
      valueInMs
    };
  }

  // Subscribes a listener to the ticking task for time changes.
  register(id) {
    _classPrivateFieldGet2(_listeners, this).add(id);
    // @ts-expect-error - TS2339: Property 'perform' does not exist on type '() => TaskGenerator<string | undefined>'
    // note: we could potentially use taskFor via `ember-concurrency-ts` to avoid this exception
    this.start.perform();
    return () => {
      this.unregister(id);
    };
  }

  // Unregisters listener for the time task.
  unregister(id) {
    return _classPrivateFieldGet2(_listeners, this).delete(id);
  }
  *start() {
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
  toIsoUtcString(date) {
    try {
      return DateTime.fromJSDate(date).toUTC().toJSDate().toISOString();
    } catch (error) {
      console.error('Error: Could not convert date to ISO UTC string; ', error);
    }
  }

  // Gets the currently subscribed listeners.
  get listeners() {
    return _classPrivateFieldGet2(_listeners, this);
  }
}), _descriptor = _applyDecoratedDescriptor(_class.prototype, "now", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Date.now();
  }
}), _applyDecoratedDescriptor(_class.prototype, "start", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "start"), _class.prototype), _class);

export { DATE_DISPLAY_FORMATS, DAY_IN_MS, DEFAULT_DISPLAY, DEFAULT_DISPLAY_MAPPING, DEFAULT_RELATIVE_THRESHOLDS, DISPLAYS, DISPLAY_SCALE, FORMAT_PRECISION_MINUTE, FORMAT_PRECISION_SECOND, FORMAT_PRECISION_SHORT_DATE, HOUR_IN_MS, HdsDisplayKeyValues, HdsTimeRelativeUnitValues, MILLISECOND_IN_MS, MINUTE_IN_MS, SECOND_IN_MS, THRESHOLD_RELATIVE_TIME_IN_MS, WEEK_IN_MS, TimeService as default };
//# sourceMappingURL=hds-time.js.map
