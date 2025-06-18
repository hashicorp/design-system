/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { AvailableElements } from '../../../layout/flex/types.ts';

export interface HdsFormSectionMultiFieldGroupItemSignature {
  Args: {
    width?: string;
  };
  Blocks: {
    default: [];
  };
  Element: AvailableElements;
}

export default class HdsFormSectionMultiFieldGroupItem extends Component<HdsFormSectionMultiFieldGroupItemSignature> {
  get widthStyle(): Record<string, string> {
    const widthStyle: { [key: string]: string } = {};

    if (this.args.width) {
      widthStyle['--hds-form-section-multi-field-group-item-width'] =
        this.args.width;
    }
    return widthStyle;
  }
}
