/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export default class DocTocCollapsibleItem extends Component {
  @tracked isOpen;

  constructor(owner, args) {
    super(owner, args);
    this.isOpen = this.args.item.isOpen ?? false;
  }

  @action toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }

  contentId = 'content-' + guidFor(this);

  get classNames() {
    const classes = ['doc-table-of-contents__button'];
    if (this.isOpen) {
      classes.push('doc-table-of-contents__button--open');
    }
    return classes.join(' ');
  }
}
