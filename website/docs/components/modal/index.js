/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/modal';

export default class Index extends Component {
  @tracked basicModalActive = false;
  @tracked formModalActive = false;

  get SIZES() {
    return SIZES;
  }

  get COLORS() {
    return COLORS;
  }
  @action
  noop() {
    //
  }

  @action
  activateModal(modal) {
    this[modal] = true;
  }

  @action
  deactivateModal(modal) {
    this[modal] = false;
  }
}
