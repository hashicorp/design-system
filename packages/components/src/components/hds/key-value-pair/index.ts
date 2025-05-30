/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

import type { HdsFormFieldsetSignature } from '../form/fieldset';
import type { HdsFormLegendSignature } from '../form/legend';
import type { HdsFormHelperTextSignature } from '../form/helper-text';
import type { HdsFormErrorSignature } from '../form/error';
import type { HdsYieldSignature } from '../yield';
import type { HdsKeyValuePairFieldSignature } from './field.ts';
import type { HdsKeyValuePairDeleteRowButtonSignature } from './delete-row-button.ts';
import type { HdsKeyValuePairAddRowButtonSignature } from './add-row-button.ts';

export interface HdsKeyValuePairSignature {
  Args: HdsFormFieldsetSignature['Args'] & {
    data?: Array<unknown>;
    columns?: 1 | 2 | 3;
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
        Field?: ComponentLike<HdsKeyValuePairFieldSignature>;
        DeleteRowButton?: ComponentLike<HdsKeyValuePairDeleteRowButtonSignature>;
        rowData?: unknown;
      },
    ];
    footer?: [
      {
        Generic?: ComponentLike<HdsYieldSignature>;
        AddRowButton?: ComponentLike<HdsKeyValuePairAddRowButtonSignature>;
      },
    ];
  };
  Element: HdsFormFieldsetSignature['Element'];
}

export default class HdsKeyValuePair extends Component<HdsKeyValuePairSignature> {
  private _fieldsetElement!: HTMLFieldSetElement;
  @tracked data: Array<unknown> = this.args.data ?? [];
  // @tracked private _currentNumberOfRows = this.data.length ?? 0;

  private _setUpFieldsetElement = modifier((element: HTMLFieldSetElement) => {
    this._fieldsetElement = element;
  });

  get columns(): string {
    return `${this.args.columns ?? 2}`;
  }

  // get deleteRowButtonText(): string {
  //   return this.args.addRowButtonText ?? 'Delete Row';
  // }

  // get canAddRow(): boolean {
  //   return (
  //     this.args.maxRows === undefined ||
  //     this._currentNumberOfRows < this.args.maxRows
  //   );
  // }

  get canDeleteRow(): boolean {
    return this.data.length > 1;
  }

  // @action onDeleteRowClick(index: number): void {
  //   // if (this.args.onDeleteRowClick && typeof this.args.onDeleteRowClick === 'function') {
  //   //   this.args.onDeleteRowClick(index);
  //   // }

  //   const newData = this.data.filter((_, i) => i !== index);

  //   this.data = newData;
  //   this._currentNumberOfRows = newData.length;
  //   this._fieldsetElement.focus();
  // }

  // @action onAddRowClick(): void {
  //   if (this.canAddRow) {
  //     this.data = [...this.data, {}];
  //     this._currentNumberOfRows = this.data.length;
  //   }
  // }
}
