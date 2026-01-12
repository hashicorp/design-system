/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

import { HdsIcon } from '@hashicorp/design-system-components/components';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

import docClipboard from 'website/modifiers/doc-clipboard';

interface DocCopyButtonCodeSignature {
  Args: {
    type?: 'solid' | 'code';
    color?: 'primary' | 'secondary';
    textToCopy: string;
    textToShow?: string;
    encoded?: boolean;
    isIconOnly?: boolean;
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
    return this.args.type ?? 'solid';
  }

  get color() {
    return this.args.color ?? 'primary';
  }

  get textGenericDynamic() {
    let label;
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
    return label;
  }

  get textToCopy() {
    return this.args.encoded
      ? decodeURI(this.args.textToCopy)
      : this.args.textToCopy;
  }

  get labelId() {
    const uuid = this.args.id ?? guidFor(this);
    return 'copy-label-' + uuid;
  }

  get labelClassName() {
    if (this.args.isIconOnly) {
      return 'sr-only';
    } else {
      return 'doc-copy-button__text';
    }
  }

  get labelText() {
    let labelText;
    if (this.args.isIconOnly) {
      labelText = this.textGenericDynamic;
    } else if (this.args.type === 'code') {
      labelText = this.args.textToShow ?? this.textToCopy;
    } else {
      labelText = this.args.textToShow ?? this.textGenericDynamic;
    }
    return labelText;
  }

  get classNames() {
    const classes = ['doc-copy-button'];

    classes.push(`doc-copy-button--type-${this.type}`);
    classes.push(`doc-copy-button--color-${this.color}`);

    if (this.args.isIconOnly) {
      classes.push(`doc-copy-button--icon-only`);
    }

    if (this.status === 'success') {
      classes.push('doc-copy-button--status-success');
    } else if (this.status === 'error') {
      classes.push('doc-copy-button--status-error');
    }

    return classes.join(' ');
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

  <template>
    <button
      class={{this.classNames}}
      type="button"
      {{docClipboard
        text=this.textToCopy
        onSuccess=this.onSuccess
        onError=this.onError
      }}
      aria-labelledby={{this.labelId}}
      ...attributes
    >
      <span
        id={{this.labelId}}
        class={{this.labelClassName}}
      >{{this.labelText}}</span>
      <HdsIcon
        class="doc-copy-button__icon"
        @name={{this.iconName}}
        @stretched={{true}}
      />
    </button>
  </template>
}
