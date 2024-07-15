/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class HdsRevealComponent extends Component {
  @tracked isOpen = this.args.item.isOpen;
  @action toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }

  contentId = 'content-' + guidFor(this);

  get classNames() {
    const classes = ['doc-table-of-contents__button'];
    if (this.isOpen) {
      classes.push('open');
    }
    return classes.join(' ');
  }
}
