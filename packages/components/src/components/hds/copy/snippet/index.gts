/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { concat } from '@ember/helper';

import { HdsCopySnippetColorValues } from './types.ts';
import HdsTextCode from '../../text/code.gts';
import HdsIcon from '../../icon/index.gts';
import hdsClipboard from '../../../../modifiers/hds-clipboard.ts';

import type { HdsCopySnippetColors } from './types.ts';
import type { HdsClipboardModifierSignature } from '../../../../modifiers/hds-clipboard.ts';
import type { HdsIconSignature } from '../../icon/index.gts';

export const DEFAULT_COLOR = HdsCopySnippetColorValues.Primary;
export const COLORS: HdsCopySnippetColors[] = Object.values(
  HdsCopySnippetColorValues
);

export const DEFAULT_ICON = 'clipboard-copy';
export const SUCCESS_ICON = 'clipboard-checked';
export const ERROR_ICON = 'clipboard-x';
export const DEFAULT_STATUS = 'idle';

export interface HdsCopySnippetSignature {
  Args: {
    color?: HdsCopySnippetColors;
    isFullWidth?: boolean;
    textToCopy: HdsClipboardModifierSignature['Args']['Named']['text'];
    isTruncated?: boolean;
    onSuccess?: HdsClipboardModifierSignature['Args']['Named']['onSuccess'];
    onError?: HdsClipboardModifierSignature['Args']['Named']['onError'];
  };
  Element: HTMLButtonElement;
}

export default class HdsCopySnippet extends Component<HdsCopySnippetSignature> {
  @tracked private _status = DEFAULT_STATUS;
  @tracked private _timer: ReturnType<typeof setTimeout> | undefined;

  get textToShow(): string {
    const { textToCopy = '' } = this.args;

    if (typeof textToCopy === 'string') {
      return textToCopy;
    } else {
      return textToCopy.toString();
    }
  }

  get icon(): HdsIconSignature['Args']['name'] {
    let icon: HdsIconSignature['Args']['name'] = DEFAULT_ICON;
    if (this._status === 'success') {
      icon = SUCCESS_ICON;
    } else if (this._status === 'error') {
      icon = ERROR_ICON;
    }
    return icon;
  }

  get color(): HdsCopySnippetColors {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Copy::Snippet" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  get isFullWidth(): boolean {
    return this.args.isFullWidth ?? false;
  }

  get isTruncated(): boolean {
    return this.args.isTruncated ?? false;
  }

  get classNames(): string {
    const classes = ['hds-copy-snippet'];

    // add a class based on the @color argument
    classes.push(`hds-copy-snippet--color-${this.color}`);

    // add a class based on the tracked status (idle/success/error)
    classes.push(`hds-copy-snippet--status-${this._status}`);

    // add a class based on the @isTruncated argument
    if (this.isTruncated) {
      classes.push('hds-copy-snippet--is-truncated');
    }

    // add a class based on the @isFullWidth argument
    if (this.isFullWidth) {
      classes.push('hds-copy-snippet--width-full');
    }

    return classes.join(' ');
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
    <button
      type="button"
      class={{this.classNames}}
      {{hdsClipboard
        text=@textToCopy
        onSuccess=this.onSuccess
        onError=this.onError
      }}
      aria-label={{concat "copy " @textToCopy}}
      ...attributes
    >
      <HdsTextCode class="hds-copy-snippet__text" @tag="span" @size="100">
        {{this.textToShow}}
      </HdsTextCode>
      <HdsIcon @name={{this.icon}} class="hds-copy-snippet__icon" />
    </button>
  </template>
}
