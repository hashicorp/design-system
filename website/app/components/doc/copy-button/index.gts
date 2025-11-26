/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { HdsCopyButton } from '@hashicorp/design-system-components/components';
import type { HdsCopyButtonSignature } from '@hashicorp/design-system-components/components/hds/copy/button/index';

interface DocCopyButtonCodeSignature {
  Args: {
    type?: 'solid' | 'ghost';
    textToCopy: string;
    textToShow?: string;
    encoded?: boolean;
    isFullWidth?: boolean;
    id?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HdsCopyButtonSignature['Element'];
}

export default class DocCopyButton extends Component<DocCopyButtonCodeSignature> {
  @tracked status = 'idle';
  // @tracked iconName: HdsIconSignature['Args']['name'] = 'clipboard-copy';
  @tracked timer: ReturnType<typeof setTimeout> | undefined;

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

  onSuccess = () => {
    this.status = 'success';
    // this.iconName = 'clipboard-checked';
    this.resetStatusDelayed();
  };

  onError = () => {
    this.status = 'error';
    // this.iconName = 'alert-triangle';
    this.resetStatusDelayed();
  };

  resetStatusDelayed() {
    clearTimeout(this.timer);
    // make it fade back to the default state
    this.timer = setTimeout(() => {
      this.status = 'idle';
      // this.iconName = 'clipboard-copy';
    }, 2000);
  }

  get classNames() {
    const classes = ['doc-copy-button'];
    classes.push(`doc-copy-button--type-${this.type}`);
    if (this.isFullWidth) {
      classes.push(`doc-copy-button--width-full`);
    }
    return classes.join(' ');
  }

  <template>
    <HdsCopyButton
      {{!-- class={{this.classNames}} --}}
      @color="primary"
      @text="Copy"
      @textToCopy={{this.textToCopy}}
      @onSuccess={{this.onSuccess}}
      @onError={{this.onError}}
      ...attributes
    />
    {{!-- <CopyButton
      class={{this.classNames}}
      @text={{this.textToCopy}}
      @onSuccess={{this.onSuccess}}
      @onError={{this.onError}}
      ...attributes
    >
      {{#if this.textToShow}}
        <span class="doc-copy-button__visible-value">{{this.textToShow}}</span>
      {{/if}}
      {{#if this.label}}
        <span
          id="copy-label-{{@id}}"
          class="doc-copy-button__label"
        >{{this.label}}</span>
      {{/if}}
      <HdsIcon
        class="doc-copy-button__icon"
        @name={{this.iconName}}
        @stretched={{true}}
      />
    </CopyButton> --}}
  </template>
}
