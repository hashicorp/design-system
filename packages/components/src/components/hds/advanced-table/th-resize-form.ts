/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import type HdsAdvancedTableColumn from './models/column';
import type Owner from '@ember/owner';

export interface HdsAdvancedTableThResizeFormSignature {
  Args: {
    column: HdsAdvancedTableColumn;
    labelId: string;
    onClose: () => void;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLFormElement;
}

export default class HdsAdvancedTableThResizeForm extends Component<HdsAdvancedTableThResizeFormSignature> {
  originalColumnNumericalWidth: number;

  constructor(
    owner: Owner,
    args: HdsAdvancedTableThResizeFormSignature['Args']
  ) {
    super(owner, args);

    const { column } = this.args;

    this.originalColumnNumericalWidth = column.numericalWidth;
  }

  @action
  resizeColumn(width: number): void {
    const { column } = this.args;

    column.setNumericalWidth(width);
  }

  @action
  handleKeyup(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.handleCancel();
    }
  }

  @action
  handleCancel(): void {
    const { column } = this.args;

    column.setNumericalWidth(this.originalColumnNumericalWidth);

    this.args.onClose();
  }

  @action
  handleSubmit(event: Event): void {
    event.preventDefault();

    this.args.onClose();
  }
}
