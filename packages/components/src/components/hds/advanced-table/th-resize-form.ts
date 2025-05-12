/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

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
  originalColumnPxWidth: number;

  constructor(
    owner: Owner,
    args: HdsAdvancedTableThResizeFormSignature['Args']
  ) {
    super(owner, args);

    const { column } = this.args;

    assert(
      'HdsAdvancedTableThResizeForm: column width must be set',
      column.pxWidth !== undefined
    );

    this.originalColumnPxWidth = column.pxWidth;
  }

  @action
  resizeColumn(width: number): void {
    const { column } = this.args;

    column.setPxWidth(width);
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

    column.setPxWidth(this.originalColumnPxWidth);

    this.args.onClose();
  }

  @action
  handleSubmit(event: Event): void {
    event.preventDefault();

    this.args.onClose();
  }
}
