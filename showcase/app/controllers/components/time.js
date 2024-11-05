/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
// import { action } from '@ember/object';

export default class TimeController extends Controller {
  @service hdsTime;

  // Test relative times
  get nearTimeDates() {
    let now = this.hdsTime.now;

    let fiveMinutesFromNow = new Date(now + 1000 * 60 * 5);
    let twoDaysFromNow = new Date(now + 1000 * 60 * 60 * 24 * 2);
    let oneWeekFromNow = new Date(now + 1000 * 60 * 60 * 24 * 7);
    let fiveMinutesAgo = new Date(now - 1000 * 60 * 5);
    let twoDaysAgo = new Date(now - 1000 * 60 * 60 * 24 * 2);
    let oneWeekAgo = new Date(now - 1000 * 60 * 60 * 24 * 7);

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
