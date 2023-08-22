/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HdsFormTextInputFieldComponent extends Component {
  @tracked isMasked = this.args.isMasked ?? true;
  @tracked type = this.args.type ?? 'text';

  @action
  onClickToggle() {
    this.isMasked = !this.isMasked;
    this.type = this.isMasked ? 'password' : 'text';
  }
}
