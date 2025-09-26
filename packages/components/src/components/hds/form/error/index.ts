/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsFormErrorMessageSignature } from './message';

export const ID_PREFIX = 'error-';

export interface HdsFormErrorSignature {
  Args: {
    contextualClass?: string;
    controlId?: string;
    onInsert?: (element: HTMLElement, ...args: unknown[]) => void;
    onRemove?: (element: HTMLElement, ...args: unknown[]) => void;
  };
  Blocks: {
    default: [
      {
        Message?: ComponentLike<HdsFormErrorMessageSignature>;
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
}
