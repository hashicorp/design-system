/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
export default class DocTocCollapsibleItemComponent extends Component {
  get isOpen() {
    return this.args.item.isOpen;
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
