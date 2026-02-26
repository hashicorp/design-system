/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { typeOf } from '@ember/utils';
import { service } from '@ember/service';
import { hash, concat } from '@ember/helper';

import hdsFormatDate from '../../../helpers/hds-format-date.ts';
import HdsTimeRange from './range.gts';
import HdsTimeSingle from './single.gts';
import HdsTooltipButton from '../tooltip-button/index.gts';

import type { DisplayType } from '../../../services/hds-time-types.ts';
import type TimeService from '../../../services/hds-time.ts';

export interface HdsTimeSignature {
  Args: {
    date?: Date | string;
    startDate?: Date | string;
    endDate?: Date | string;
    display?:
      | 'utc'
      | 'relative'
      | 'friendly-only'
      | 'friendly-local'
      | 'friendly-relative';
    isOpen?: boolean;
    hasTooltip?: boolean;
    isoUtcString?: string;
  };
  Element: HTMLElement;
}

const dateIsValid = (date?: Date | string): date is Date =>
  date instanceof Date && !isNaN(+date);

export default class HdsTime extends Component<HdsTimeSignature> {
  @service declare readonly hdsTime: TimeService;

  get date(): Date | undefined {
    const { date } = this.args;

    // Sometimes an ISO date string might be passed in instead of a JS Date.
    if (date) {
      if (typeOf(date) === 'string') {
        return new Date(date);
      } else if (date instanceof Date) {
        return date;
      }
    }
  }

  get startDate(): Date | undefined {
    const { startDate } = this.args;

    if (startDate) {
      if (typeOf(startDate) === 'string') {
        return new Date(startDate);
      } else if (startDate instanceof Date) {
        return startDate;
      }
    }
  }

  get endDate(): Date | undefined {
    const { endDate } = this.args;

    if (endDate) {
      if (typeOf(endDate) === 'string') {
        return new Date(endDate);
      } else if (endDate instanceof Date) {
        return endDate;
      }
    }
  }

  get isValidDate(): boolean {
    return dateIsValid(this.date);
  }

  get isValidDateRange(): boolean {
    if (dateIsValid(this.startDate) && dateIsValid(this.endDate)) {
      return this.startDate <= this.endDate;
    }
    return false;
  }

  get hasTooltip(): boolean {
    return this.args.hasTooltip ?? true;
  }

  get isoUtcString(): string {
    const date = this.date;

    if (dateIsValid(date)) {
      const isoUtcString = this.hdsTime.toIsoUtcString(date);

      if (isoUtcString) return isoUtcString;
    }

    return '';
  }

  get rangeIsoUtcString(): string {
    const startDate = this.startDate;
    const endDate = this.endDate;

    if (dateIsValid(startDate) && dateIsValid(endDate)) {
      return `${this.hdsTime.toIsoUtcString(startDate)}–${this.hdsTime.toIsoUtcString(endDate)}`;
    }
    return '';
  }

  get display(): DisplayType {
    const date = this.date;
    const { display } = this.args;

    if (dateIsValid(date)) {
      const nextDiff = this.hdsTime.timeDifference(this.hdsTime.now, date);
      return this.hdsTime.format(nextDiff, display);
    }
    return {
      options: undefined,
      difference: { absValueInMs: 0, valueInMs: 0 },
      relative: { value: 0, unit: undefined },
    };
  }

  get isOpen(): boolean {
    return this.args.isOpen ?? false;
  }

  didInsertNode = (): void => {
    const date = this.date;

    if (dateIsValid(date)) {
      this.hdsTime.register(date);
    }
  };

  willDestroyNode = (): void => {
    const date = this.date;

    if (dateIsValid(date)) {
      this.hdsTime.unregister(date);
    }
  };

  <template>
    {{! IMPORTANT: we need to add "squishies" here (~) because otherwise the whitespace added by Ember causes extra space around the time element - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}
    {{~#let this.display as |display|~}}
      {{~#if this.isValidDate~}}
        {{~#if this.hasTooltip~}}
          <HdsTooltipButton
            class="hds-time-wrapper"
            @text={{if
              display.options.tooltipFormat
              (hdsFormatDate this.date display.options.tooltipFormat)
              this.isoUtcString
            }}
            @placement="bottom"
            @extraTippyOptions={{hash showOnCreate=this.isOpen}}
          >
            <HdsTimeSingle
              @date={{this.date}}
              @isoUtcString={{this.isoUtcString}}
              @display={{this.display}}
              @register={{this.didInsertNode}}
              @unregister={{this.willDestroyNode}}
              ...attributes
            />
          </HdsTooltipButton>
        {{~else~}}
          <HdsTimeSingle
            @date={{this.date}}
            @isoUtcString={{this.isoUtcString}}
            @display={{this.display}}
            @register={{this.didInsertNode}}
            @unregister={{this.willDestroyNode}}
            ...attributes
          />
        {{~/if~}}
      {{~else if this.isValidDateRange~}}
        {{~#if this.hasTooltip~}}
          <HdsTooltipButton
            class="hds-time-wrapper"
            @text={{if
              display.options.tooltipFormat
              (concat
                (hdsFormatDate this.startDate display.options.tooltipFormat)
                (hdsFormatDate this.endDate display.options.tooltipFormat)
              )
              this.rangeIsoUtcString
            }}
            @placement="bottom"
            @extraTippyOptions={{hash showOnCreate=this.isOpen}}
          >
            <HdsTimeRange
              @startDate={{this.startDate}}
              @endDate={{this.endDate}}
              ...attributes
            />
          </HdsTooltipButton>
        {{~else~}}
          <HdsTimeRange
            @startDate={{this.startDate}}
            @endDate={{this.endDate}}
            ...attributes
          />
        {{~/if~}}
      {{~/if~}}
    {{~/let~}}
  </template>
}
