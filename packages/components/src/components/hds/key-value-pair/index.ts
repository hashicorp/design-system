/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import { tracked } from '@glimmer/tracking';

import type { HdsFormFieldsetSignature } from '../form/fieldset';
import type { HdsFormLegendSignature } from '../form/legend';
import type { HdsFormHelperTextSignature } from '../form/helper-text';
import type { HdsFormErrorSignature } from '../form/error';
import type { HdsYieldSignature } from '../yield';
import HdsKeyValuePairCell from './cell.ts';

export interface HdsKeyValuePairSignature {
  Args: HdsFormFieldsetSignature['Args'] & {
    data?: Array<unknown>;
    maxRows?: number;
    addRowButtonText?: string;
  };
  Blocks: {
    header?: [
      {
        Legend?: ComponentLike<HdsFormLegendSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
      },
    ];
    row: [
      {
        Cell?: WithBoundArgs<
          typeof HdsKeyValuePairCell,
          'rowIndex' | 'rowData' | 'cellId'
        >;
        rowIndex: number;
        rowData: unknown;
      },
    ];
    footer?: [
      {
        ExtraBefore?: ComponentLike<HdsYieldSignature>;
        ExtraAfter?: ComponentLike<HdsYieldSignature>;
      },
    ];
  };
  Element: HdsFormFieldsetSignature['Element'];
}

export default class HdsKeyValuePair extends Component<HdsKeyValuePairSignature> {
  @tracked private _currentNumberOfRows = this.args.data?.length ?? 0;

  get addRowButtonText(): string {
    return this.args.addRowButtonText ?? 'Add Row';
  }

  get deleteRowButtonText(): string {
    return this.args.addRowButtonText ?? 'Delete Row';
  }

  get canAddRow(): boolean {
    return (
      this.args.maxRows === undefined ||
      this._currentNumberOfRows < this.args.maxRows
    );
  }

  get canDeleteRow(): boolean {
    return this._currentNumberOfRows > 1;
  }
}
