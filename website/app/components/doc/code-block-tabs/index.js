/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

export default class DocCodeBlockTabsComponent extends Component {
  @tracked selectedTab = 'gts';

  id = guidFor(this);

  @action
  onClickTab(tab) {
    this.selectedTab = tab;
  }
}
