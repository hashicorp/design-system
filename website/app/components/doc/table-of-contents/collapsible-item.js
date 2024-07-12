/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DocTableOfContentsCollapsibleItemComponent extends Component {
  @tracked isOpen = this.args.item.isOpen;
  @action toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}
