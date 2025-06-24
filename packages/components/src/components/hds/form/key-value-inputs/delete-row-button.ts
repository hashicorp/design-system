/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { action } from '@ember/object';

import type { HdsButtonSignature } from '../../button/index.ts';

export interface HdsFormKeyValueInputsDeleteRowButtonSignature {
  Args: {
    fieldsetElement?: HTMLFieldSetElement;
    onClick?: (rowData: unknown) => void;
    rowData: unknown;
    rowIndex: number;
    text?: HdsButtonSignature['Args']['text'];
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsFormKeyValueInputsDeleteRowButton extends Component<HdsFormKeyValueInputsDeleteRowButtonSignature> {
  get text(): string {
    return this.args.text ?? `Delete row ${this.args.rowIndex + 1}`;
  }

  @action
  onClick(): void {
    const { onClick } = this.args;

    if (typeof onClick === 'function') {
      onClick(this.args.rowData);
    }

    // move focus to the fieldset element so people using a keyboard are not forced back to the top of the page.
    this.args.fieldsetElement?.focus();
  }
}
