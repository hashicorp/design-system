/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import { SIZES } from '@hashicorp/design-system-components/components/hds/flyout';

export default class Index extends Component {
  @tracked basicFlyoutActive = false;

  get SIZES() {
    return SIZES;
  }

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
