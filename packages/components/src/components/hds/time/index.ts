/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { typeOf } from '@ember/utils';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import type { DisplayType, DefaultDisplayType } from './types.ts';

import type TimeService from '../../../services/hds-time';

export interface HdsTimeSignature {
  Args: {
    date?: Date | string | undefined;
    startDate?: Date | string | undefined;
    endDate?: Date | string | undefined;
    display?: string;
    isOpen?: boolean;
    hasTooltip?: boolean;
    displayInner: DisplayType;
    isoUtcStringInner: string;
    didInsertNode: () => void;
    willDestroyNode: () => void;
  };
  Element: HTMLElement;
}

const dateIsValid = (date?: Date | string): date is Date =>
  date instanceof Date && !isNaN(+date);

export default class HdsTime extends Component<HdsTimeSignature> {
  @service declare readonly hdsTime: TimeService;

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

    this.hdsTime.unregister(date);
  }

  get date(): Date | undefined {
    const { date } = this.args;

    // Sometimes an ISO date string might be passed in instead of a JS Date.
    if (typeOf(date) === 'string') {
      return new Date(date as string);
    }
    return date as Date;
  }

  get startDate(): Date | undefined {
    const { startDate } = this.args;

    if (typeOf(startDate) === 'string') {
      return new Date(startDate as string);
    }
    return startDate as Date;
  }

  get endDate(): Date | undefined {
    const { endDate } = this.args;

    if (typeOf(endDate) === 'string') {
      return new Date(endDate as string);
    }
    return endDate as Date;
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
      return this.hdsTime.toIsoUtcString(date);
    }

    return '';
  }
  get rangeIsoUtcString(): string {
    const startDate = this.startDate;
    const endDate = this.endDate;

    if (dateIsValid(startDate) && dateIsValid(endDate)) {
      return `${this.hdsTime.toIsoUtcString(startDate)} – ${this.hdsTime.toIsoUtcString(endDate)}`;
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
}
