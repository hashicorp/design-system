/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { modifier } from 'ember-modifier';

import HdsIcon from '../../icon/index.gts';
import HdsFormErrorMessage from './message.gts';

export const ID_PREFIX = 'error-';

export interface HdsFormErrorSignature {
  Args: {
    contextualClass?: string;
    controlId?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onInsert?: (element: HTMLElement, ...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRemove?: (element: HTMLElement, ...args: any[]) => void;
  };
  Blocks: {
    default: [
      {
        Message?: typeof HdsFormErrorMessage;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFormError extends Component<HdsFormErrorSignature> {
  get id(): string | null {
    const { controlId } = this.args;
    if (controlId) {
      return `${ID_PREFIX}${controlId}`;
    }
    return null;
  }

  private _setUpError = modifier((element: HTMLDivElement) => {
    const { onInsert, onRemove } = this.args;

    // notice: these are guards used to prevent triggering an error when the component is used as standalone element
    if (typeof onInsert === 'function') {
      onInsert(element);
    }

    return () => {
      if (typeof onRemove === 'function') {
        onRemove(element);
      }
    };
  });

  get classNames(): string {
    const classes = ['hds-form-error'];

    // add a class based on the @contextualClass argument
    // notice: this will *not* be documented for public use
    // the reason for this is that the contextual component declarations don't pass attributes to the component
    if (this.args.contextualClass) {
      classes.push(this.args.contextualClass);
    }

    return classes.join(' ');
  }

  <template>
    <div
      class={{this.classNames}}
      id={{this.id}}
      {{this._setUpError}}
      ...attributes
    >
      <HdsIcon class="hds-form-error__icon" @name="alert-diamond-fill" />
      <div class="hds-form-error__content">
        {{yield (hash Message=HdsFormErrorMessage)}}
      </div>
    </div>
  </template>
}
