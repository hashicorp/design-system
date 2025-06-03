/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';

import type { HdsButtonSignature } from '../../button/index.ts';

export interface HdsFormKeyValuePairAddRowButtonSignature {
  Args: {
    text?: HdsButtonSignature['Args']['text'];
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsFormKeyValuePairAddRowButton extends Component<HdsFormKeyValuePairAddRowButtonSignature> {
  get text(): string {
    return this.args.text ?? 'Add row';
  }
}
