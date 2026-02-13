/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

import { HdsCopyButtonSizeValues } from './types.ts';
import HdsButton from '../../button/index.gts';
import hdsClipboard from '../../../../modifiers/hds-clipboard.ts';

import type { HdsCopyButtonSizes } from './types.ts';
import type { HdsButtonSignature } from '../../button/index.gts';
import type { HdsClipboardModifierSignature } from '../../../../modifiers/hds-clipboard.ts';
import type { HdsIconSignature } from '../../icon/index.gts';
import type HdsIntlService from '../../../../services/hds-intl.ts';

export const DEFAULT_SIZE = HdsCopyButtonSizeValues.Medium;
export const SIZES: HdsCopyButtonSizes[] = Object.values(
  HdsCopyButtonSizeValues
);
export const DEFAULT_ICON = 'clipboard-copy';
export const SUCCESS_ICON = 'clipboard-checked';
export const ERROR_ICON = 'clipboard-x';
export const DEFAULT_STATUS = 'idle';

export interface HdsCopyButtonSignature {
  Args: HdsButtonSignature['Args'] & {
    size?: HdsCopyButtonSizes;
    textToCopy?: HdsClipboardModifierSignature['Args']['Named']['text'];
    targetToCopy?: HdsClipboardModifierSignature['Args']['Named']['target'];
    onSuccess?: HdsClipboardModifierSignature['Args']['Named']['onSuccess'];
    onError?: HdsClipboardModifierSignature['Args']['Named']['onError'];
    ariaMessageText?: string;
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsCopyButton extends Component<HdsCopyButtonSignature> {
  @service declare readonly hdsIntl: HdsIntlService;

  @tracked private _status = DEFAULT_STATUS;
  @tracked private _timer: ReturnType<typeof setTimeout> | undefined;

  get icon(): HdsIconSignature['Args']['name'] {
    let icon: HdsIconSignature['Args']['name'] = DEFAULT_ICON;
    if (this._status === 'success') {
      icon = SUCCESS_ICON;
    } else if (this._status === 'error') {
      icon = ERROR_ICON;
    }
    return icon;
  }

  get size(): HdsCopyButtonSizes {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Copy::Button" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  get classNames(): string {
    const classes = ['hds-copy-button'];

    // add a class based on the @size argument
    classes.push(`hds-button--size-${this.size}`);

    classes.push(`hds-copy-button--status-${this._status}`);

    return classes.join(' ');
  }

  get ariaMessageText(): string {
    if (this._status === 'success') {
      return (
        this.args.ariaMessageText ??
        this.hdsIntl.t('hds.components.copy-button.aria-message-text', {
          default: 'Copied to clipboard',
        })
      );
    } else {
      return '';
    }
  }

  onSuccess = (
    args: HdsClipboardModifierSignature['Args']['Named']['onSuccess']
  ): void => {
    this._status = 'success';
    this.resetStatusDelayed();

    const { onSuccess } = this.args;

    if (typeof onSuccess === 'function') {
      onSuccess(args);
    }
  };

  onError = (
    args: HdsClipboardModifierSignature['Args']['Named']['onError']
  ): void => {
    this._status = 'error';
    this.resetStatusDelayed();

    const { onError } = this.args;

    if (typeof onError === 'function') {
      onError(args);
    }
  };

  resetStatusDelayed = (): void => {
    clearTimeout(this._timer);
    // make it fade back to the default state
    this._timer = setTimeout((): void => {
      this._status = DEFAULT_STATUS;
    }, 1500);
  };

  <template>
    <HdsButton
      class={{this.classNames}}
      @size={{this.size}}
      @isFullWidth={{@isFullWidth}}
      @text={{@text}}
      @icon={{this.icon}}
      @isIconOnly={{@isIconOnly}}
      @color="secondary"
      @iconPosition="trailing"
      {{hdsClipboard
        text=@textToCopy
        target=@targetToCopy
        onSuccess=this.onSuccess
        onError=this.onError
      }}
      ...attributes
    />
    <span class="sr-only" aria-live="polite">{{this.ariaMessageText}}</span>
  </template>
}
