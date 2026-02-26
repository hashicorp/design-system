/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';

import hdsFormatDate from '../../../helpers/hds-format-date.ts';

import type TimeService from '../../../services/hds-time.ts';

export interface HdsTimeRangeSignature {
  Args: {
    startDate?: Date;
    endDate?: Date;
  };
  Element: HTMLElement;
}

export default class HdsTimeRange extends Component<HdsTimeRangeSignature> {
  @service declare readonly hdsTime: TimeService;

  get startDateIsoUtcString(): string | undefined {
    const { startDate } = this.args;
    if (startDate) {
      return this.hdsTime.toIsoUtcString(startDate);
    }
  }

  get endDateIsoUtcString(): string | undefined {
    const { endDate } = this.args;
    if (endDate) {
      return this.hdsTime.toIsoUtcString(endDate);
    }
  }

  get startDateDisplayFormat(): {
    month: Intl.DateTimeFormatOptions['month'];
    day: Intl.DateTimeFormatOptions['day'];
    year?: Intl.DateTimeFormatOptions['year'];
    hour?: Intl.DateTimeFormatOptions['hour'];
    minute?: Intl.DateTimeFormatOptions['minute'];
    second?: Intl.DateTimeFormatOptions['second'];
  } {
    const { startDate, endDate } = this.args;

    if (startDate?.getFullYear() !== endDate?.getFullYear()) {
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

  <template>
    {{! IMPORTANT: we need to add "squishies" here (~) because otherwise the whitespace added by Ember causes extra space around the time element - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}
    <span class="hds-time hds-time--range" ...attributes>
      <time datetime={{this.startDateIsoUtcString}}>
        {{~hdsFormatDate @startDate this.startDateDisplayFormat~}}
      </time>
      &ndash;
      <time datetime={{this.endDateIsoUtcString}}>
        {{~hdsFormatDate @endDate this.endDateDisplayFormat~}}
      </time>
    </span>
  </template>
}
