/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';

import { on } from '@ember/modifier';
import HdsButton from '../../button/index.gts';
import type { HdsButtonSignature } from '../../button/index.ts';

export interface HdsFormKeyValueInputsDeleteRowButtonSignature {
  Args: {
    onClick?: (rowData: unknown, rowIndex: number) => void;
    onInsert?: () => void;
    onRemove?: () => void;
    returnFocusTo?: HTMLFieldSetElement;
    rowData: unknown;
    rowIndex: number;
    text?: HdsButtonSignature['Args']['text'];
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsFormKeyValueInputsDeleteRowButton extends Component<HdsFormKeyValueInputsDeleteRowButtonSignature> {
  private _onInsert = modifier(() => {
    if (this.args.onInsert) {
      this.args.onInsert();
    }

    return () => {
      if (this.args.onRemove) {
        this.args.onRemove();
      }

      const { returnFocusTo } = this.args;

      if (returnFocusTo && returnFocusTo.isConnected) {
        returnFocusTo.focus();
      }
    };
  });

  get text(): string {
    return this.args.text ?? `Delete row ${this.args.rowIndex + 1}`;
  }

  @action
  onClick(): void {
    const { onClick } = this.args;

    if (typeof onClick === 'function') {
      onClick(this.args.rowData, this.args.rowIndex);
    }
  }

  <template>
    <span
      class="hds-form-key-value-inputs__delete-row-button-container"
      {{this._onInsert}}
    >
      <HdsButton
        @text={{this.text}}
        @size="medium"
        @color="secondary"
        @icon="trash"
        @isIconOnly={{true}}
        class="hds-form-key-value-inputs__delete-row-button"
        {{on "click" this.onClick}}
        ...attributes
      />
    </span>
  </template>
}
