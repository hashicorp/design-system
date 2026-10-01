/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { service } from '@ember/service';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

import type { HdsTextBodySignature } from '../../text/body.gts';
import type HdsIntlService from '../../../../services/hds-intl';

const ID_PREFIX = 'character-count-';
const NOOP = (): void => {};

export interface HdsFormCharacterCountSignature {
  Args: {
    contextualClass?: string;
    controlId?: string;
    maxLength?: number | string;
    minLength?: number | string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onInsert?: (element: HTMLElement, ...args: any[]) => void;
    value?: string;
  };
  Blocks: {
    default?: [
      {
        minLength?: number;
        maxLength?: number;
        currentLength?: number;
        remaining?: number;
        shortfall?: number;
      },
    ];
  };
  Element: HdsTextBodySignature['Element'];
}

export default class HdsFormCharacterCount extends Component<HdsFormCharacterCountSignature> {
  @service declare readonly hdsIntl: HdsIntlService;

  // The current number of characters in @value
  get currentLength(): number {
    const { value } = this.args;
    return value ? value.length : 0;
  }

  private _countMessage({
    key,
    count,
    singular,
    plural,
    prefix = '',
  }: {
    key: string;
    count: number;
    singular: string;
    plural: string;
    prefix?: string;
  }): string {
    return this.hdsIntl.t(key, {
      default: `${prefix}${count} ${count === 1 ? singular : plural}`,
      count,
    });
  }

  get maxLength(): number | undefined {
    const { maxLength } = this.args;
    if (maxLength) {
      return typeof maxLength === 'number' ? maxLength : parseInt(maxLength);
    }
  }

  get minLength(): number | undefined {
    const { minLength } = this.args;
    if (minLength) {
      return typeof minLength === 'number' ? minLength : parseInt(minLength);
    }
  }

  get remaining(): number | undefined {
    return this.maxLength ? this.maxLength - this.currentLength : undefined;
  }

  get shortfall(): number | undefined {
    return this.minLength ? this.minLength - this.currentLength : undefined;
  }

  get message(): string {
    if (this.minLength && this.currentLength === 0) {
      return this._countMessage({
        key: 'hds.components.form.character-count.required',
        count: this.minLength,
        singular: 'character required',
        plural: 'characters required',
      });
    } else if (this.minLength && this.currentLength < this.minLength) {
      return this._countMessage({
        key: 'hds.components.form.character-count.more-required',
        count: this.shortfall ?? 0,
        singular: 'more character required',
        plural: 'more characters required',
      });
    } else if (this.maxLength && this.currentLength === 0) {
      return this._countMessage({
        key: 'hds.components.form.character-count.allowed',
        count: this.maxLength,
        singular: 'character allowed',
        plural: 'characters allowed',
      });
    } else if (this.maxLength && this.currentLength <= this.maxLength) {
      return this._countMessage({
        key: 'hds.components.form.character-count.remaining',
        count: this.remaining ?? 0,
        singular: 'character remaining',
        plural: 'characters remaining',
      });
    } else if (
      this.maxLength &&
      this.remaining &&
      this.currentLength > this.maxLength
    ) {
      return this._countMessage({
        key: 'hds.components.form.character-count.exceeded-by',
        count: -this.remaining,
        singular: 'character',
        plural: 'characters',
        prefix: 'Exceeded by ',
      });
    } else {
      return this._countMessage({
        key: 'hds.components.form.character-count.entered',
        count: this.currentLength,
        singular: 'character entered',
        plural: 'characters entered',
      });
    }
  }

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
    const classes = ['hds-form-character-count'];

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
      ...attributes
      aria-live="polite"
    >
      {{#if (has-block)}}
        {{yield
          (hash
            minLength=this.minLength
            maxLength=this.maxLength
            currentLength=this.currentLength
            remaining=this.remaining
            shortfall=this.shortfall
          )
        }}
      {{else}}
        {{this.message}}
      {{/if}}
    </div>
  </template>
}
