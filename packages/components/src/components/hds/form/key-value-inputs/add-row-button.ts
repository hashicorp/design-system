/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { action } from '@ember/object';

import type { HdsButtonSignature } from '../../button/index.ts';

export interface HdsFormKeyValueInputsAddRowButtonSignature {
  Args: {
    text?: HdsButtonSignature['Args']['text'];
    onClick?: () => void;
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsFormKeyValueInputsAddRowButton extends Component<HdsFormKeyValueInputsAddRowButtonSignature> {
  get text(): string {
    return this.args.text ?? 'Add row';
  }

  @action
  onClick(): void {
    const { onClick } = this.args;

    if (typeof onClick === 'function') {
      onClick();
    }
  }
}
