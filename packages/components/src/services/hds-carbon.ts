/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class HdsCarbonService extends Service {
  @tracked carbonModeEnabled: boolean = false;

  toggleCarbonMode() {
    this.carbonModeEnabled = !this.carbonModeEnabled;
  }
}
