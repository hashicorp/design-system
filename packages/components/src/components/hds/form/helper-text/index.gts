/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';

import type { HdsTextBodySignature } from '../../text/body.gts';

export const ID_PREFIX = 'helper-text-';

export interface HdsFormHelperTextSignature {
  Args: {
    contextualClass?: string;
    controlId?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onInsert?: (element: HTMLElement, ...args: any[]) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

export default class HdsFormHelperText extends Component<HdsFormHelperTextSignature> {
  get id(): string | null {
    const { controlId } = this.args;
    if (controlId) {
      return `${ID_PREFIX}${controlId}`;
    }
    return null;
  }

  private _setUpHelperText = modifier((element: HTMLElement) => {
    const { onInsert } = this.args;

    // notice: this is a guard used to prevent triggering an error when the component is used as standalone element
    if (typeof onInsert === 'function') {
      onInsert(element);
    }
  });

  get classNames(): string {
    const classes = ['hds-form-helper-text'];

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
      {{this._setUpHelperText}}
      ...attributes
    >
      {{yield}}
    </div>
  </template>
}
