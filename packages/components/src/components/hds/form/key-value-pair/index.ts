/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import { tracked } from '@glimmer/tracking';

import type { HdsFormFieldsetSignature } from '../fieldset/index.ts';
import type { HdsFormLegendSignature } from '../legend/index.ts';
import type { HdsFormHelperTextSignature } from '../helper-text/index.ts';
import type { HdsFormErrorSignature } from '../error/index.ts';
import type { HdsYieldSignature } from '../../yield/index.ts';
import type { HdsFormKeyValuePairFieldSignature } from './field.ts';
import type { HdsFormKeyValuePairDeleteRowButtonSignature } from './delete-row-button.ts';
import type { HdsFormKeyValuePairAddRowButtonSignature } from './add-row-button.ts';

export interface HdsFormKeyValuePairSignature {
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
        Field?: ComponentLike<HdsFormKeyValuePairFieldSignature>;
        DeleteRowButton?: ComponentLike<HdsFormKeyValuePairDeleteRowButtonSignature>;
        rowData?: unknown;
      },
    ];
    footer?: [
      {
        Generic?: ComponentLike<HdsYieldSignature>;
        AddRowButton?: ComponentLike<HdsFormKeyValuePairAddRowButtonSignature>;
      },
    ];
  };
  Element: HdsFormFieldsetSignature['Element'];
}

export default class HdsFormKeyValuePair extends Component<HdsFormKeyValuePairSignature> {
  @tracked data: Array<unknown> = this.args.data ?? [];

  get columns(): string {
    return `${this.args.columns ?? 2}`;
  }

  get canDeleteRow(): boolean {
    return this.data.length > 1;
  }
}
