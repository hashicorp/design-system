/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { typeOf } from '@ember/utils';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import type { DisplayType } from '../../../services/hds-time-types.ts';

import type TimeService from '../../../services/hds-time';

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
    displayInner: DisplayType;
    isoUtcString?: string;
    didInsertNode: () => void;
    willDestroyNode: () => void;
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

  get isoUtcString(): string | undefined {
    const date = this.date;

    if (dateIsValid(date)) {
      return this.hdsTime.toIsoUtcString(date);
    }

    return undefined;
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
      relative: { value: 0, unit: '' },
    };
  }

  get isOpen(): boolean {
    return this.args.isOpen ?? false;
  }

  @action
  didInsertNode(): void {
    const date = this.date;

    if (dateIsValid(date)) {
      this.hdsTime.register(date);
    }
  }

  @action
  willDestroyNode(): void {
    const date = this.date;
    if (dateIsValid(date)) {
      this.hdsTime.unregister(date);
    }
  }
}
