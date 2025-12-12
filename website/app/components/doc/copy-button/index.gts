/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { HdsIcon } from '@hashicorp/design-system-components/components';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

import docClipboard from 'website/modifiers/doc-clipboard';

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
  Element: HTMLButtonElement;
}

export default class DocCopyButton extends Component<DocCopyButtonCodeSignature> {
  @tracked status = 'idle';
  @tracked iconName: HdsIconSignature['Args']['name'] = 'clipboard-copy';
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

  get isFullWidth() {
    return this.args.isFullWidth ?? false;
  }

  onSuccess = () => {
    this.status = 'success';
    this.iconName = 'clipboard-checked';
    this.resetStatusDelayed();
  };

  onError = () => {
    this.status = 'error';
    this.iconName = 'alert-triangle';
    this.resetStatusDelayed();
  };

  resetStatusDelayed() {
    clearTimeout(this.timer);
    // make it fade back to the default state
    this.timer = setTimeout(() => {
      this.status = 'idle';
      this.iconName = 'clipboard-copy';
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
    <button
      class={{this.classNames}}
      type="button"
      {{docClipboard
        text=@textToCopy
        onSuccess=this.onSuccess
        onError=this.onError
      }}
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
    </button>
  </template>
}
