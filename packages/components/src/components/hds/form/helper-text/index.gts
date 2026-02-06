/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

import HdsTextBody from '../../text/body.gts';

import type { HdsTextBodySignature } from '../../text/body.gts';

export const ID_PREFIX = 'helper-text-';

const NOOP = (): void => {};

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
    <HdsTextBody
      class={{this.classNames}}
      @tag="div"
      @size="100"
      @weight="regular"
      id={{this.id}}
      {{didInsert this.onInsert}}
      ...attributes
    >
      {{yield}}
    </HdsTextBody>
  </template>
}
