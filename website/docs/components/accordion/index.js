/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked state = 'close';

  @action
  toggleState() {
    this.state = this.state === 'open' ? 'close' : 'open';
  }
}
