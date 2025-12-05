/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Index extends Component {
  @tracked selectedCount = 10;
  @tracked totalCount = 100;

  @action
  updateSelectedCount() {
    const { selectedCount } = this;
    this.selectedCount = selectedCount + 1;
  }
}
