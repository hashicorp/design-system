/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/* eslint-disable ember/no-classic-classes, prettier/prettier */
import HistoryLocation from '@ember/routing/history-location';

export default HistoryLocation.extend({
  formatURL() {
    let url = this._super(...arguments);

    if (url.includes('#')) {
      return url.replace(/([^/])#(.*)/, '$1/#$2');
    } else {
      return url.replace(/\/?$/, '/');
    }
  }
});
