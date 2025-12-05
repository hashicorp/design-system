/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { action } from '@ember/object';

import type { HdsButtonSignature } from '../../button/index.ts';

export interface HdsFormKeyValueInputsAddRowButtonSignature {
  Args: {
    onClick?: () => void;
    text?: HdsButtonSignature['Args']['text'];
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
