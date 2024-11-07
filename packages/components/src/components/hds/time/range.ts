/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { inject as service } from '@ember/service';
import type TimeService from '../../../services/hds-time';
import Component from '@glimmer/component';

export interface HdsTimeRangeSignature {
  Args: {
    startDate: Date;
    endDate: Date;
  };
  Element: HTMLTimeElement;
}

export default class HdsTimeRange extends Component<HdsTimeRangeSignature> {
  @service declare readonly hdsTime: TimeService;

  get startDateIsoUtString(): string {
    return this.hdsTime.toIsoUtcString(this.args.startDate);
  }

  get endDateIsoUtcString(): string {
    return this.hdsTime.toIsoUtcString(this.args.endDate);
  }

  get startDateDisplayFormat(): {
    month: Intl.DateTimeFormatOptions['month'];
    day: Intl.DateTimeFormatOptions['day'];
    year?: Intl.DateTimeFormatOptions['year'];
    hour?: Intl.DateTimeFormatOptions['hour'];
    minute?: Intl.DateTimeFormatOptions['minute'];
    second?: Intl.DateTimeFormatOptions['second'];
  } {
    const { startDate } = this.args;
    const { endDate } = this.args;

    if (startDate.getFullYear() !== endDate.getFullYear()) {
      return {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      };
    } else {
      return {
        month: 'short',
        day: 'numeric',
        year: undefined,
      };
    }
  }

  get endDateDisplayFormat(): {
    month: Intl.DateTimeFormatOptions['month'];
    day: Intl.DateTimeFormatOptions['day'];
    year?: Intl.DateTimeFormatOptions['year'];
    hour?: Intl.DateTimeFormatOptions['hour'];
    minute?: Intl.DateTimeFormatOptions['minute'];
    second?: Intl.DateTimeFormatOptions['second'];
  } {
    return {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
  }
}
