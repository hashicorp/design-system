/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked basicFlyoutActive = false;

  @action
  noop() {
    //
  }

  @action
  activateFlyout(flyout) {
    this[flyout] = true;
  }

  @action
  deactivateFlyout(flyout) {
    this[flyout] = false;
  }
}
