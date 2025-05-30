/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';

import type { HdsButtonSignature } from '../button';

export interface HdsKeyValuePairAddRowButtonSignature {
  Args: {
    text?: HdsButtonSignature['Args']['text'];
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsKeyValuePairAddRowButton extends Component<HdsKeyValuePairAddRowButtonSignature> {
  get text(): string {
    return this.args.text ?? "Add row";
  }
}
