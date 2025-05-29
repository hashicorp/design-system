/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import { tracked } from '@glimmer/tracking';

import type { HdsFormFieldsetSignature } from '../form/fieldset';
import type { HdsFormLegendSignature } from '../form/legend';
import type { HdsFormHelperTextSignature } from '../form/helper-text';
import type { HdsFormErrorSignature } from '../form/error';
import type { HdsYieldSignature } from '../yield';
import type { HdsFormSelectFieldSignature } from '../form/select/field';
import type { HdsFormTextInputFieldSignature } from '../form/text-input/field';

export interface HdsKeyValuePairSignature {
  Args: HdsFormFieldsetSignature['Args'] & {
    data?: Array<unknown>;
    maxRows?: number;
  };
  Blocks: {
    header?: [{
      Legend?: ComponentLike<HdsFormLegendSignature>;
      HelperText?: ComponentLike<HdsFormHelperTextSignature>;
      Error?: ComponentLike<HdsFormErrorSignature>;
    }];
    row: [{
      Generic?: ComponentLike<HdsYieldSignature>;
      Select?: ComponentLike<HdsFormSelectFieldSignature>;
      TextInput?: ComponentLike<HdsFormTextInputFieldSignature>;
      rowData?: unknown;
    }];
    footer?: [{
      ExtraBefore?: ComponentLike<HdsYieldSignature>;
      ExtraAfter?: ComponentLike<HdsYieldSignature>;
    }]
  };
  Element: HdsFormFieldsetSignature['Element'];
}

export default class HdsKeyValuePair extends Component<HdsKeyValuePairSignature> {
  @tracked currentNumberOfRows = this.args.data?.length ?? 0;

  get canAddRow(): boolean {
    return this.args.maxRows === undefined || this.currentNumberOfRows < this.args.maxRows;
  }

  get canDeleteRow(): boolean {
    return this.currentNumberOfRows > 1;
  }
}
