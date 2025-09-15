/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { service } from '@ember/service';

import type TimeService from '@hashicorp/design-system-components/services/hds-time';
import type { PageComponentsTimeModel } from 'showcase/routes/page-components/time';

export default class PageComponentsTimeController extends Controller {
  declare model: PageComponentsTimeModel;

  @service declare readonly hdsTime: TimeService;

  // Test relative times
  get nearTimeDates() {
    const now = this.hdsTime.now;

    const fiveMinutesFromNow = new Date(now + 1000 * 60 * 5);
    const twoDaysFromNow = new Date(now + 1000 * 60 * 60 * 24 * 2);
    const oneWeekFromNow = new Date(now + 1000 * 60 * 60 * 24 * 7);
    const fiveMinutesAgo = new Date(now - 1000 * 60 * 5);
    const twoDaysAgo = new Date(now - 1000 * 60 * 60 * 24 * 2);
    const oneWeekAgo = new Date(now - 1000 * 60 * 60 * 24 * 7);

    return [
      fiveMinutesFromNow,
      twoDaysFromNow,
      oneWeekFromNow,
      fiveMinutesAgo,
      twoDaysAgo,
      oneWeekAgo,
    ];
  }
}
