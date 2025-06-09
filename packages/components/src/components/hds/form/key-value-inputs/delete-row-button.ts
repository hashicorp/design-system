/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { action } from '@ember/object';

import type { HdsButtonSignature } from '../../button/index.ts';

export interface HdsFormKeyValueInputsDeleteRowButtonSignature {
  Args: {
    text?: HdsButtonSignature['Args']['text'];
    rowIndex: number;
    rowData: unknown;
    canDeleteRow?: boolean;
    onClick?: (rowData: unknown) => void;
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
  }
}
