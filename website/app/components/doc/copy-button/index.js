/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DocCopyButtonComponent extends Component {
  @tracked status = 'idle';
  @tracked iconName = 'clipboard-copy';
  @tracked timer;

  get type() {
    return this.args.type ?? 'solid'; // options are `solid` or `ghost`
  }

  get label() {
    let label;
    if (this.type === 'solid') {
      switch (this.status) {
        case 'success':
          label = 'Copied';
          break;
        case 'error':
          label = 'Error';
          break;
        default:
          label = 'Copy';
          break;
      }
    }
    return label;
  }

  get textToCopy() {
    return this.args.encoded
      ? decodeURI(this.args.textToCopy)
      : this.args.textToCopy;
  }

  get textToShow() {
    let textToShow;
    if (this.type === 'ghost') {
      textToShow = this.args.textToShow ?? this.args.textToCopy;
    }
    return textToShow;
  }

  /**
   * @param isFullWidth
   * @type {boolean}
   * @default false
   * @description Indicates that a button should take up the full width of the parent container. The default is false.
   */
  get isFullWidth() {
    return this.args.isFullWidth ?? false;
  }

  @action
  onSuccess() {
    this.status = 'success';
    this.iconName = 'clipboard-checked';
    this.resetStatusDelayed();
  }

  @action
  onError() {
    this.status = 'error';
    this.iconName = 'alert-triangle';
    this.resetStatusDelayed();
  }

  resetStatusDelayed() {
    clearTimeout(this.timer);
    // make it fade back to the default state
    this.timer = setTimeout(() => {
      this.status = 'idle';
      this.iconName = 'clipboard-copy';
    }, 2000);
  }

  get classNames() {
    let classes = ['doc-copy-button'];
    classes.push(`doc-copy-button--type-${this.type}`);
    if (this.isFullWidth) {
      classes.push(`doc-copy-button--width-full`);
    }
    return classes.join(' ');
  }
}
