/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { deferAfterRender } from '../../../utils/hds-defer.ts';
import { guidFor } from '@ember/object/internals';
import { hash } from '@ember/helper';
import { modifier } from 'ember-modifier';

export interface HdsDisclosurePrimitiveSignature {
  Args: {
    isOpen?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClose?: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClickToggle?: (...args: any[]) => void;
  };
  Blocks: {
    toggle: [
      {
        contentId: string;
        isOpen: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClickToggle: (...args: any[]) => void;
      },
    ];
    content: [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        close: (...args: any[]) => void;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsDisclosurePrimitive extends Component<HdsDisclosurePrimitiveSignature> {
  @tracked private _isOpen = false;
  @tracked private _isControlled = this.args.isOpen !== undefined;
  private _contentId = 'content-' + guidFor(this);
  private _hasSetUpStateSync = false;

  get isOpen(): boolean {
    if (this._isControlled) {
      // if the state is controlled from outside, the argument overrides the internal state
      return this.args.isOpen ?? this._isOpen;
    } else {
      // if the state changes internally, the internal state overrides the argument
      return this._isOpen;
    }
  }

  set isOpen(value) {
    this._isOpen = value || false;
  }

  onClickToggle = (): void => {
    this.isOpen = !this.isOpen;
    this._isControlled = false;
    // we call the "onClickToggle" callback if it exists and it's a function
    if (
      this.args.onClickToggle &&
      typeof this.args.onClickToggle === 'function'
    ) {
      this.args.onClickToggle(this.isOpen);
    }
  };

  // a change of `@isOpen` gives the control back to the argument, even if the state was changed internally since
  private _syncStateWithArgs = modifier(
    (_element: HTMLDivElement, [isOpen]: [boolean | undefined]) => {
      // only changes are synchronized, the initial state is set when the component is created
      if (!this._hasSetUpStateSync) {
        this._hasSetUpStateSync = true;
        return;
      }

      if (isOpen !== undefined) {
        this.isOpen = isOpen;
      }
      this._isControlled = true;
    }
  );

  close = (): void => {
    // we schedule this afterRender to avoid an error in tests caused by updating `isOpen` multiple times in the same computation
    // no destroyable is passed so that `onClose` still fires if closing tears the component down
    deferAfterRender((): void => {
      this.isOpen = false;
      // we call the "onClose" callback if it exists (and is a function)
      if (this.args.onClose && typeof this.args.onClose === 'function') {
        this.args.onClose();
      }
    });
  };

  <template>
    <div
      class="hds-disclosure-primitive"
      {{this._syncStateWithArgs @isOpen}}
      ...attributes
    >
      <div class="hds-disclosure-primitive__toggle">
        {{yield
          (hash
            onClickToggle=this.onClickToggle
            isOpen=this.isOpen
            contentId=this._contentId
          )
          to="toggle"
        }}
      </div>
      <div class="hds-disclosure-primitive__content" id={{this._contentId}}>
        {{#if this.isOpen}}
          {{yield (hash close=this.close) to="content"}}
        {{/if}}
      </div>
    </div>
  </template>
}
