/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';

import type { HdsButtonSignature } from '../button';

export interface HdsKeyValuePairDeleteRowButtonSignature {
  Args: {
    text?: HdsButtonSignature['Args']['text'];
    rowIndex: number;
    canDeleteRow?: boolean;
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsKeyValuePairDeleteRowButton extends Component<HdsKeyValuePairDeleteRowButtonSignature> {
  get text(): string {
    return this.args.text ?? `Delete row ${this.args.rowIndex + 1}`;
  }
}
