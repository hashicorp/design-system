/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';

import HdsIcon from '../../icon/index.gts';
import HdsTextBody from '../../text/body.gts';
import HdsFormErrorMessage from './message.gts';

export const ID_PREFIX = 'error-';

const NOOP = (): void => {};

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onInsert(): (element: HTMLElement, ...args: any[]) => void {
    const { onInsert } = this.args;

    // notice: this is a guard used to prevent triggering an error when the component is used as standalone element
    if (typeof onInsert === 'function') {
      return onInsert;
    } else {
      return NOOP;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onRemove(): (element: HTMLElement, ...args: any[]) => void {
    const { onRemove } = this.args;

    // notice: this is a guard used to prevent triggering an error when the component is used as standalone element
    if (typeof onRemove === 'function') {
      return onRemove;
    } else {
      return NOOP;
    }
  }

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
      {{didInsert this.onInsert}}
      {{willDestroy this.onRemove}}
      ...attributes
    >
      <HdsIcon class="hds-form-error__icon" @name="alert-diamond-fill" />
      <HdsTextBody
        class="hds-form-error__content"
        @tag="div"
        @size="100"
        @weight="medium"
      >
        {{yield (hash Message=HdsFormErrorMessage)}}
      </HdsTextBody>
    </div>
  </template>
}
